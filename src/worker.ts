// @ts-ignore
import { connect } from 'cloudflare:sockets';
// @ts-ignore
import { Buffer } from 'node:buffer'
import {isIP, inRange} from 'range_check';
import Message from './dns';

const proxyIPs = ['139.162.185.147'];
const proxyPort = 6666;
let proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
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

async function bepassOverWs(request: Request) {
	const params: any = {}
	const url = new URL(request.url)
	const queryString = url.search.slice(1).split('&')

	queryString.forEach(item => {
		const kv = item.split('=')
		if (kv[0]) params[kv[0]] = kv[1] || true
	})

	const destinationHost = params["host"]
	const destinationPort = params["port"]
	const destinationNetwork = params["net"] ? params["net"].toString().toLowerCase() : "tcp"

	const webSocketPair = new WebSocketPair();
	const [client, webSocket] = Object.values(webSocketPair);

	webSocket.accept();

	let address = '';
	let portWithRandomLog = '';
	const log = (info: any, event: any) => {
		console.log(`[${address}:${portWithRandomLog}] ${info}`, event || '');
	};

	const readableWebSocketStream = makeReadableWebSocketStream(webSocket, log);

	let remoteSocketWapper = {
		value: null,
	};

	// ws --> remote
	readableWebSocketStream.pipeTo(new WritableStream({
		async write(chunk, controller) {
			if (remoteSocketWapper.value) {
				const writer = (remoteSocketWapper.value as any).writable.getWriter()
				await writer.write(chunk);
				writer.releaseLock();
				return;
			}
			handleTCPOutBound(remoteSocketWapper, destinationNetwork, destinationHost, destinationPort, chunk, webSocket, log);
		},
		close() {
			log(`readableWebSocketStream is close`, ``);
		},
		abort(reason) {
			log(`readableWebSocketStream is abort`, JSON.stringify(reason));
		},
	})).catch((err) => {
		log('readableWebSocketStream pipeTo error', err);
	});

	return new Response(null, {
		status: 101,
		// @ts-ignore
		webSocket: client,
	});
}

function makeReadableWebSocketStream(webSocketServer: any, log: any) {
	let readableStreamCancel = false;
	const stream = new ReadableStream({
		start(controller) {
			webSocketServer.addEventListener('message', (event: any) => {
				if (readableStreamCancel) {
					return;
				}
				const message = event.data;
				controller.enqueue(message);
			});

			// The event means that the client closed the client -> server stream.
			// However, the server -> client stream is still open until you call close() on the server side.
			// The WebSocket protocol says that a separate close message must be sent in each direction to fully close the socket.
			webSocketServer.addEventListener('close', () => {
					// client send close, need close server
					// if stream is cancel, skip controller.close
					safeCloseWebSocket(webSocketServer);
					if (readableStreamCancel) {
						return;
					}
					controller.close();
				}
			);
			webSocketServer.addEventListener('error', (err: any) => {
					log('webSocketServer has error');
					controller.error(err);
				}
			);
		},
		cancel(reason) {
			// 1. pipe WritableStream has error, this cancel will called, so ws handle server close into here
			// 2. if readableStream is cancel, all controller.close/enqueue need skip,
			// 3. but from testing controller.error still work even if readableStream is cancel
			if (readableStreamCancel) {
				return;
			}
			log(`ReadableStream was canceled, due to ${reason}`)
			readableStreamCancel = true;
			safeCloseWebSocket(webSocketServer);
		}
	});

	return stream;
}

function longToByteArray(long: number) {
	// we want to represent the input as a 2-bytes array
	const byteArray = [0, 0];

	for ( let index = 0; index < byteArray.length; index ++ ) {
		const byte = long & 0xff;
		byteArray [ index ] = byte;
		long = (long - byte) / 256 ;
	}

	return byteArray;
};

async function handleTCPOutBound(remoteSocket: any, destinationNetwork: any, addressRemote: any, portRemote: any, rawClientData: any, webSocket: any, log: any) {
	async function connectAndWrite(address: string, port: number, rawHeaderEnabled: boolean) {
		const mmd = destinationNetwork + "@" + addressRemote + "$" + portRemote
		if(!isIP(address)){
			const ip = await lookup(address)
			if(ip){
				address = ip
			}
		}
		if(destinationNetwork === "udp" || (!rawHeaderEnabled && isIP(address) && (inRange(address, cf_ipv6) || inRange(address, cf_ipv4)))){
			address = proxyIP
			port = proxyPort
			rawHeaderEnabled = true;
		}
		const tcpSocket = connect({
			hostname: address,
			port: port,
		});
		remoteSocket.value = tcpSocket;
		if(rawHeaderEnabled){
			const writer = tcpSocket.writable.getWriter();
			try {
				const header = new TextEncoder().encode(mmd + "\r\n");
				await writer.write(header);
			} catch (writeError: any) {
				writer.releaseLock();
				await tcpSocket.close();
				return new Response(writeError.message, { status: 500 });
			}
			writer.releaseLock();
		}
		return tcpSocket;
	}

	// if the cf connect tcp socket have no incoming data, we retry to redirect ip
	async function retry() {
		const tcpSocket = await connectAndWrite(proxyIP, proxyPort, true)
		// no matter retry success or not, close websocket
		safeCloseWebSocket(webSocket);
		remoteSocketToWS(tcpSocket, webSocket, null, log);
	}

	const tcpSocket = await connectAndWrite(addressRemote, portRemote, false);

	// when remoteSocket is ready, pass to websocket
	// remote--> ws
	remoteSocketToWS(tcpSocket, webSocket, retry, log);
}

async function remoteSocketToWS(remoteSocket: any, webSocket: any, retry: any, log: any) {
	// remote--> ws
	let remoteChunkCount = 0;
	let chunks = [];
	let hasIncomingData = false; // check if remoteSocket has incoming data
	await remoteSocket.readable
		.pipeTo(
			new WritableStream({
				start() {
				},
				async write(chunk, controller) {
					hasIncomingData = true;
					// remoteChunkCount++;
					if (webSocket.readyState !== WS_READY_STATE_OPEN) {
						controller.error(
							'webSocket.readyState is not open, maybe close'
						);
					}
					// seems no need rate limit this, CF seems fix this??..
					// if (remoteChunkCount > 20000) {
					// 	// cf one package is 4096 byte(4kb),  4096 * 20000 = 80M
					// 	await delay(1);
					// }
					webSocket.send(chunk);
				},
				close() {
					log(`remoteConnection!.readable is close with hasIncomingData is ${hasIncomingData}`);
					// safeCloseWebSocket(webSocket); // no need server close websocket frist for some case will casue HTTP ERR_CONTENT_LENGTH_MISMATCH issue, client will send close event anyway.
				},
				abort(reason) {
					console.error(`remoteConnection!.readable abort`, reason);
				},
			})
		)
		.catch((error: any) => {
			console.error(
				`remoteSocketToWS has exception `,
				error.stack || error
			);
			safeCloseWebSocket(webSocket);
		});

	// seems is cf connect socket have error,
	// 1. Socket.closed will have error
	// 2. Socket.readable will be close without any data coming
	if (!hasIncomingData && retry) {
		log(`retry`)
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
	const buf = Buffer.alloc(512);
	buf.writeUInt16BE(0x1234, 0);
	buf.writeUInt16BE(0x0100, 2);
	buf.writeUInt16BE(0x0001, 4);
	buf.writeUInt16BE(0x0000, 6);
	buf.writeUInt16BE(0x0000, 8);
	buf.writeUInt16BE(0x0000, 10);

	let offset = 12;
	const parts = domain.split('.');

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		buf.writeUInt8(part.length, offset);
		buf.write(part, offset + 1);
		offset += part.length + 1;
	}

	buf.writeUInt8(0, offset++);

	buf.writeUInt16BE(0x0001, offset);
	buf.writeUInt16BE(0x0001, offset + 2);

	return buf.slice(0, offset + 4);
}

function parseResponse(b: any) {
	const buffer = Buffer.from(b);
	const x = new Message();
	x.parseOnce(buffer);
	if(x.answer.length > 0 && x.answer[0].rdata.length > 0 && x.answer[0].rdata[0]) {
		return x.answer[0].rdata[0];
	}
	return null;
}

async function lookup(domain: string) {
	const dnsQuery = createDnsQuery(domain);
	const resp = await fetch(`https://${dnsHost}/dns-query`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/dns-message'},
		body: dnsQuery
	});
	return parseResponse(await resp.arrayBuffer());
}
