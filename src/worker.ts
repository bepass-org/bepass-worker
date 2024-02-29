// @ts-ignore
import { connect } from 'cloudflare:sockets';
// @ts-ignore
import { Buffer } from 'buffer';
import { inRange, isIP } from 'range_check';
import Message from './dns';

const proxyIPs = ["relay1.bepass.org", "relay2.bepass.org", "relay3.bepass.org"];
const proxyPort = 6666;
let proxyIP = proxyIPs[0];
const dnsHost = "1.1.1.1"
const WS_READY_STATE_OPEN = 1;
const WS_READY_STATE_CLOSING = 2;
const cf_ipv4 = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
]

const cf_ipv6 = [
  '2400:cb00::/32',
  '2606:4700::/32',
  '2803:f800::/32',
  '2405:b500::/32',
  '2405:8100::/32',
  '2a06:98c0::/29',
  '2c0f:f248::/32',
]


export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    switch (url.pathname) {
      case '/dns-query':
        url.hostname = dnsHost;
        return await fetch(url.toString());
      case '/connect': // for test connect to cf socket
        return await bepassOverWs(request)
      default:
        const result = await lookup('www.google.com');
        return new Response("{\"status\": 'dns functions normally, example resolve returned: " + result + "'}", {
          status: 200,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
    }
  },
};

interface ProxyParams {
  host?: string;
  port?: string;
  session?: string;
  net?: string;
}

async function bepassOverWs(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const params: ProxyParams = Object.fromEntries(new URLSearchParams(url.search));

  const { host, port, session, net } = params;
  const proxyIP = session ? proxyIPs[parseInt(session) % proxyIPs.length] : proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
  const destinationNetwork = net?.toLowerCase() || "tcp";

  const webSocketPair = new WebSocketPair();
  const [client, webSocket] = Object.values(webSocketPair);

  webSocket.accept();

  const log = (info: string, event: any = '') => {
    console.log(`[${host}:${port}] ${info}`, event);
  };

  const readableWebSocketStream = makeReadableWebSocketStream(webSocket, log);

  let remoteSocketWrapper = { value: null };

  readableWebSocketStream.pipeTo(new WritableStream({
    async write(chunk) {
      if (remoteSocketWrapper.value) {
        const writer = remoteSocketWrapper.value.writable.getWriter();
        await writer.write(chunk);
        writer.releaseLock();
      } else {
        await handleTCPOutBound(remoteSocketWrapper, destinationNetwork, host, port, chunk, webSocket, log);
      }
    },
    close() {
      log('readableWebSocketStream is closed');
    },
    abort(reason) {
      log('readableWebSocketStream is aborted', JSON.stringify(reason));
    },
  })).catch(err => {
    log('Error piping readableWebSocketStream', err);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}


function makeReadableWebSocketStream(webSocketServer: any, log: any) {
  let readableStreamCancel = false;

  const handleIncomingMessage = (event: any, controller: any) => {
    if (!readableStreamCancel) {
      const message = event.data;
      controller.enqueue(message);
    }
  };

  const handleCloseEvent = (controller: any) => {
    if (!readableStreamCancel) {
      safeCloseWebSocket(webSocketServer);
      controller.close();
    }
  };

  const handleErrorEvent = (err: any, controller: any) => {
    log('webSocketServer has error');
    if (!readableStreamCancel) {
      controller.error(err);
    }
  };

  const handleCancelEvent = (reason: any, controller: any) => {
    if (!readableStreamCancel) {
      log(`ReadableStream was canceled, due to ${reason}`);
      readableStreamCancel = true;
      safeCloseWebSocket(webSocketServer);
    }
  };

  const stream = new ReadableStream({
    start(controller) {
      webSocketServer.addEventListener('message', event => handleIncomingMessage(event, controller));
      webSocketServer.addEventListener('close', () => handleCloseEvent(controller));
      webSocketServer.addEventListener('error', err => handleErrorEvent(err, controller));
    },
    cancel(reason) {
      handleCancelEvent(reason, this.controller);
    }
  });

  return stream;
}


function longToByteArray(long) {
  // Ensure the input is within 0 to 65535
  if (long < 0 || long > 65535) {
    throw new Error('Input must be between 0 and 65535');
  }

  // Directly calculate each byte
  const lowByte = long & 0xFF; // Get the low-order byte
  const highByte = (long >> 8) & 0xFF; // Shift right 8 bits to get the high-order byte

  // Return the bytes in the desired order
  // Assuming little-endian format. If you need big-endian, reverse the order
  return [lowByte, highByte];
}


// Utilize async/await for clarity and error handling
async function handleTCPOutBound(remoteSocket, destinationNetwork, addressRemote, portRemote, rawClientData, webSocket, log) {
  async function connectAndWrite(address, port, rawHeaderEnabled) {
    address = address.replace("[", "").replace("]", ""); // Simplify address manipulation
    const mmd = `${destinationNetwork}@${addressRemote}$${portRemote}`;

    if (!isIP(address)) {
      address = await lookup(address) || address; // Streamline IP lookup fallback
    }

    // Centralize condition to adjust address and port based on network conditions
    if (destinationNetwork === "udp" || (!rawHeaderEnabled && isIP(address) && (inRange(address, cf_ipv6) || inRange(address, cf_ipv4)))) {
      address = proxyIP;
      port = proxyPort;
      rawHeaderEnabled = true;
    }

    if (address.includes(":")) address = `[${address}]`; // Inline IPv6 formatting

    const tcpSocket = connect({ hostname: address, port }); // Simplify object property when variable name matches
    remoteSocket.value = tcpSocket;

    if (rawHeaderEnabled) {
      try {
        const writer = tcpSocket.writable.getWriter();
        await writer.write(new TextEncoder().encode(`${mmd}\r\n`)); // Streamline write operation
        writer.releaseLock();
      } catch (error) {
        console.error('Error writing header:', error);
        await tcpSocket.close();
        throw error; // Propagate errors for centralized handling
      }
    }
    return tcpSocket;
  }

  try {
    const tcpSocket = await connectAndWrite(addressRemote, portRemote, false);
    remoteSocketToWS(tcpSocket, webSocket, log, () => connectAndWrite(proxyIP, proxyPort, true)); // Pass retry as a callback
  } catch (error) {
    log('handleTCPOutBound error', error);
    safeCloseWebSocket(webSocket);
  }
}


async function remoteSocketToWS(remoteSocket, webSocket, log, retry) {
  let hasIncomingData = false;

  try {
    await remoteSocket.readable.pipeTo(new WritableStream({
      write(chunk) {
        hasIncomingData = true;
        if (webSocket.readyState !== WebSocket.OPEN) {
          throw new Error('WebSocket is not open');
        }
        webSocket.send(chunk);
      },
      close() {
        log(`Connection closed; incoming data: ${hasIncomingData}`);
      }
    }));
  } catch (error) {
    console.error('Error in remoteSocketToWS:', error);
    safeCloseWebSocket(webSocket);
  }

  if (!hasIncomingData && retry) {
    log('No incoming data, retrying...');
    retry();
  }
}


function safeCloseWebSocket(socket: any) {
  try {
    if (socket.readyState === WS_READY_STATE_OPEN || socket.readyState === WS_READY_STATE_CLOSING) {
      socket.close();
    }
  } catch (error) {
    console.error('safeCloseWebSocket error', error);
  }
}

function createDnsQuery(domain: string) {
  const header = Buffer.from([
    0x12, 0x34, // Transaction ID
    0x01, 0x00, // Flags
    0x00, 0x01, // Questions
    0x00, 0x00, // Answer RRs
    0x00, 0x00, // Authority RRs
    0x00, 0x00, // Additional RRs
  ]);

  const question = domain.split('.').reduce((acc, part) => {
    acc.push(part.length, ...Buffer.from(part));
    return acc;
  }, []);

  const footer = Buffer.from([
    0x00,       // Null byte to end the QNAME
    0x00, 0x01, // Type: A
    0x00, 0x01, // Class: IN
  ]);

  return Buffer.concat([header, Buffer.from(question), footer]);
}


function parseResponse(response: Buffer) {
  const message = new Message();
  message.parseOnce(response);

  if (message.answer.length > 0 && message.answer[0].rdata.length > 0) {
    return message.answer[0].rdata[0]; // Assuming the first record's first data is desired
  }

  return null;
}

async function lookup(domain: string) {
  const dnsQuery = createDnsQuery(domain);
  const resp = await fetch(`https://${dnsHost}/dns-query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/dns-message' },
    body: dnsQuery
  });
  return parseResponse(await resp.arrayBuffer());
}
