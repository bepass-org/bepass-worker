var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup2 = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup2[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup2[tmp >> 2] + lookup2[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup2[tmp >> 10] + lookup2[tmp >> 4 & 63] + lookup2[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer4;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer4.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer4.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer4.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer4.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer4.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer4.prototype);
      return buf;
    }
    function Buffer4(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer4.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer4.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer4.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer4.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer4.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer4, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer4.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer4.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer4.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer4.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy2 = new Uint8Array(arrayView);
        return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer4.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer4.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer4.alloc(+length);
    }
    Buffer4.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer4.prototype;
    };
    Buffer4.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer4.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer4.from(b, b.offset, b.byteLength);
      if (!Buffer4.isBuffer(a) || !Buffer4.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer4.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer4.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer4.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer4.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer4.isBuffer(buf))
              buf = Buffer4.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer4.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer4.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer4.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer4.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer4.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer4.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer4.prototype.toLocaleString = Buffer4.prototype.toString;
    Buffer4.prototype.equals = function equals(b) {
      if (!Buffer4.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer4.compare(this, b) === 0;
    };
    Buffer4.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer4.prototype[customInspectSymbol] = Buffer4.prototype.inspect;
    }
    Buffer4.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer4.from(target, target.offset, target.byteLength);
      }
      if (!Buffer4.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer4.from(val, encoding);
      }
      if (Buffer4.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer4.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer4.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer4.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer4.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer4.prototype.readUintLE = Buffer4.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer4.prototype.readUintBE = Buffer4.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer4.prototype.readUint8 = Buffer4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer4.prototype.readUint16LE = Buffer4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer4.prototype.readUint16BE = Buffer4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer4.prototype.readUint32LE = Buffer4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer4.prototype.readUint32BE = Buffer4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer4.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer4.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer4.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer4.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer4.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer4.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer4.prototype.writeUintLE = Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeUintBE = Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeUint8 = Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer4.prototype.writeUint16LE = Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer4.prototype.writeUint16BE = Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer4.prototype.writeUint32LE = Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer4.prototype.writeUint32BE = Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer4.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer4.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer4.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer4.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer4.prototype.copy = function copy2(target, targetStart, start, end) {
      if (!Buffer4.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer4.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer4.isBuffer(val) ? val : Buffer4.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// src/worker.ts
var import_buffer2 = __toESM(require_buffer());
import { connect } from "cloudflare:sockets";

// node_modules/range_check/dist/range-check.es5.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var ipaddr = createCommonjsModule(function(module) {
  (function() {
    var expandIPv6, ipaddr2, ipv4Part, ipv4Regexes, ipv6Part, ipv6Regexes, matchCIDR, root, zoneIndex;
    ipaddr2 = {};
    root = this;
    if (module !== null && module.exports) {
      module.exports = ipaddr2;
    } else {
      root["ipaddr"] = ipaddr2;
    }
    matchCIDR = function(first, second, partSize, cidrBits) {
      var part, shift;
      if (first.length !== second.length) {
        throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
      }
      part = 0;
      while (cidrBits > 0) {
        shift = partSize - cidrBits;
        if (shift < 0) {
          shift = 0;
        }
        if (first[part] >> shift !== second[part] >> shift) {
          return false;
        }
        cidrBits -= partSize;
        part += 1;
      }
      return true;
    };
    ipaddr2.subnetMatch = function(address, rangeList, defaultName) {
      var k, len, rangeName, rangeSubnets, subnet;
      if (defaultName == null) {
        defaultName = "unicast";
      }
      for (rangeName in rangeList) {
        rangeSubnets = rangeList[rangeName];
        if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) {
          rangeSubnets = [rangeSubnets];
        }
        for (k = 0, len = rangeSubnets.length; k < len; k++) {
          subnet = rangeSubnets[k];
          if (address.kind() === subnet[0].kind()) {
            if (address.match.apply(address, subnet)) {
              return rangeName;
            }
          }
        }
      }
      return defaultName;
    };
    ipaddr2.IPv4 = function() {
      function IPv4(octets) {
        var k, len, octet;
        if (octets.length !== 4) {
          throw new Error("ipaddr: ipv4 octet count should be 4");
        }
        for (k = 0, len = octets.length; k < len; k++) {
          octet = octets[k];
          if (!(0 <= octet && octet <= 255)) {
            throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
          }
        }
        this.octets = octets;
      }
      IPv4.prototype.kind = function() {
        return "ipv4";
      };
      IPv4.prototype.toString = function() {
        return this.octets.join(".");
      };
      IPv4.prototype.toNormalizedString = function() {
        return this.toString();
      };
      IPv4.prototype.toByteArray = function() {
        return this.octets.slice(0);
      };
      IPv4.prototype.match = function(other, cidrRange) {
        var ref;
        if (cidrRange === void 0) {
          ref = other, other = ref[0], cidrRange = ref[1];
        }
        if (other.kind() !== "ipv4") {
          throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
        }
        return matchCIDR(this.octets, other.octets, 8, cidrRange);
      };
      IPv4.prototype.SpecialRanges = {
        unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
        broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
        multicast: [[new IPv4([224, 0, 0, 0]), 4]],
        linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
        loopback: [[new IPv4([127, 0, 0, 0]), 8]],
        carrierGradeNat: [[new IPv4([100, 64, 0, 0]), 10]],
        "private": [[new IPv4([10, 0, 0, 0]), 8], [new IPv4([172, 16, 0, 0]), 12], [new IPv4([192, 168, 0, 0]), 16]],
        reserved: [[new IPv4([192, 0, 0, 0]), 24], [new IPv4([192, 0, 2, 0]), 24], [new IPv4([192, 88, 99, 0]), 24], [new IPv4([198, 51, 100, 0]), 24], [new IPv4([203, 0, 113, 0]), 24], [new IPv4([240, 0, 0, 0]), 4]]
      };
      IPv4.prototype.range = function() {
        return ipaddr2.subnetMatch(this, this.SpecialRanges);
      };
      IPv4.prototype.toIPv4MappedAddress = function() {
        return ipaddr2.IPv6.parse("::ffff:" + this.toString());
      };
      IPv4.prototype.prefixLengthFromSubnetMask = function() {
        var cidr, i, k, octet, stop, zeros, zerotable;
        zerotable = {
          0: 8,
          128: 7,
          192: 6,
          224: 5,
          240: 4,
          248: 3,
          252: 2,
          254: 1,
          255: 0
        };
        cidr = 0;
        stop = false;
        for (i = k = 3; k >= 0; i = k += -1) {
          octet = this.octets[i];
          if (octet in zerotable) {
            zeros = zerotable[octet];
            if (stop && zeros !== 0) {
              return null;
            }
            if (zeros !== 8) {
              stop = true;
            }
            cidr += zeros;
          } else {
            return null;
          }
        }
        return 32 - cidr;
      };
      return IPv4;
    }();
    ipv4Part = "(0?\\d+|0x[a-f0-9]+)";
    ipv4Regexes = {
      fourOctet: new RegExp("^" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$", "i"),
      longValue: new RegExp("^" + ipv4Part + "$", "i")
    };
    ipaddr2.IPv4.parser = function(string) {
      var match, parseIntAuto, part, shift, value;
      parseIntAuto = function(string2) {
        if (string2[0] === "0" && string2[1] !== "x") {
          return parseInt(string2, 8);
        } else {
          return parseInt(string2);
        }
      };
      if (match = string.match(ipv4Regexes.fourOctet)) {
        return function() {
          var k, len, ref, results;
          ref = match.slice(1, 6);
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            part = ref[k];
            results.push(parseIntAuto(part));
          }
          return results;
        }();
      } else if (match = string.match(ipv4Regexes.longValue)) {
        value = parseIntAuto(match[1]);
        if (value > 4294967295 || value < 0) {
          throw new Error("ipaddr: address outside defined range");
        }
        return function() {
          var k, results;
          results = [];
          for (shift = k = 0; k <= 24; shift = k += 8) {
            results.push(value >> shift & 255);
          }
          return results;
        }().reverse();
      } else {
        return null;
      }
    };
    ipaddr2.IPv6 = function() {
      function IPv6(parts, zoneId) {
        var i, k, l, len, part, ref;
        if (parts.length === 16) {
          this.parts = [];
          for (i = k = 0; k <= 14; i = k += 2) {
            this.parts.push(parts[i] << 8 | parts[i + 1]);
          }
        } else if (parts.length === 8) {
          this.parts = parts;
        } else {
          throw new Error("ipaddr: ipv6 part count should be 8 or 16");
        }
        ref = this.parts;
        for (l = 0, len = ref.length; l < len; l++) {
          part = ref[l];
          if (!(0 <= part && part <= 65535)) {
            throw new Error("ipaddr: ipv6 part should fit in 16 bits");
          }
        }
        if (zoneId) {
          this.zoneId = zoneId;
        }
      }
      IPv6.prototype.kind = function() {
        return "ipv6";
      };
      IPv6.prototype.toString = function() {
        return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, "::");
      };
      IPv6.prototype.toRFC5952String = function() {
        var bestMatchIndex, bestMatchLength, match, regex, string;
        regex = /((^|:)(0(:|$)){2,})/g;
        string = this.toNormalizedString();
        bestMatchIndex = 0;
        bestMatchLength = -1;
        while (match = regex.exec(string)) {
          if (match[0].length > bestMatchLength) {
            bestMatchIndex = match.index;
            bestMatchLength = match[0].length;
          }
        }
        if (bestMatchLength < 0) {
          return string;
        }
        return string.substring(0, bestMatchIndex) + "::" + string.substring(bestMatchIndex + bestMatchLength);
      };
      IPv6.prototype.toByteArray = function() {
        var bytes, k, len, part, ref;
        bytes = [];
        ref = this.parts;
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          bytes.push(part >> 8);
          bytes.push(part & 255);
        }
        return bytes;
      };
      IPv6.prototype.toNormalizedString = function() {
        var addr, part, suffix;
        addr = function() {
          var k, len, ref, results;
          ref = this.parts;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            part = ref[k];
            results.push(part.toString(16));
          }
          return results;
        }.call(this).join(":");
        suffix = "";
        if (this.zoneId) {
          suffix = "%" + this.zoneId;
        }
        return addr + suffix;
      };
      IPv6.prototype.toFixedLengthString = function() {
        var addr, part, suffix;
        addr = function() {
          var k, len, ref, results;
          ref = this.parts;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            part = ref[k];
            results.push(part.toString(16).padStart(4, "0"));
          }
          return results;
        }.call(this).join(":");
        suffix = "";
        if (this.zoneId) {
          suffix = "%" + this.zoneId;
        }
        return addr + suffix;
      };
      IPv6.prototype.match = function(other, cidrRange) {
        var ref;
        if (cidrRange === void 0) {
          ref = other, other = ref[0], cidrRange = ref[1];
        }
        if (other.kind() !== "ipv6") {
          throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
        }
        return matchCIDR(this.parts, other.parts, 16, cidrRange);
      };
      IPv6.prototype.SpecialRanges = {
        unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
        linkLocal: [new IPv6([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
        multicast: [new IPv6([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
        loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
        uniqueLocal: [new IPv6([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
        ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
        rfc6145: [new IPv6([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
        rfc6052: [new IPv6([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
        "6to4": [new IPv6([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
        teredo: [new IPv6([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
        reserved: [[new IPv6([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]]
      };
      IPv6.prototype.range = function() {
        return ipaddr2.subnetMatch(this, this.SpecialRanges);
      };
      IPv6.prototype.isIPv4MappedAddress = function() {
        return this.range() === "ipv4Mapped";
      };
      IPv6.prototype.toIPv4Address = function() {
        var high, low, ref;
        if (!this.isIPv4MappedAddress()) {
          throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
        }
        ref = this.parts.slice(-2), high = ref[0], low = ref[1];
        return new ipaddr2.IPv4([high >> 8, high & 255, low >> 8, low & 255]);
      };
      IPv6.prototype.prefixLengthFromSubnetMask = function() {
        var cidr, i, k, part, stop, zeros, zerotable;
        zerotable = {
          0: 16,
          32768: 15,
          49152: 14,
          57344: 13,
          61440: 12,
          63488: 11,
          64512: 10,
          65024: 9,
          65280: 8,
          65408: 7,
          65472: 6,
          65504: 5,
          65520: 4,
          65528: 3,
          65532: 2,
          65534: 1,
          65535: 0
        };
        cidr = 0;
        stop = false;
        for (i = k = 7; k >= 0; i = k += -1) {
          part = this.parts[i];
          if (part in zerotable) {
            zeros = zerotable[part];
            if (stop && zeros !== 0) {
              return null;
            }
            if (zeros !== 16) {
              stop = true;
            }
            cidr += zeros;
          } else {
            return null;
          }
        }
        return 128 - cidr;
      };
      return IPv6;
    }();
    ipv6Part = "(?:[0-9a-f]+::?)+";
    zoneIndex = "%[0-9a-z]{1,}";
    ipv6Regexes = {
      zoneIndex: new RegExp(zoneIndex, "i"),
      "native": new RegExp("^(::)?(" + ipv6Part + ")?([0-9a-f]+)?(::)?(" + zoneIndex + ")?$", "i"),
      transitional: new RegExp("^((?:" + ipv6Part + ")|(?:::)(?:" + ipv6Part + ")?)" + (ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part) + ("(" + zoneIndex + ")?$"), "i")
    };
    expandIPv6 = function(string, parts) {
      var colonCount, lastColon, part, replacement, replacementCount, zoneId;
      if (string.indexOf("::") !== string.lastIndexOf("::")) {
        return null;
      }
      zoneId = (string.match(ipv6Regexes["zoneIndex"]) || [])[0];
      if (zoneId) {
        zoneId = zoneId.substring(1);
        string = string.replace(/%.+$/, "");
      }
      colonCount = 0;
      lastColon = -1;
      while ((lastColon = string.indexOf(":", lastColon + 1)) >= 0) {
        colonCount++;
      }
      if (string.substr(0, 2) === "::") {
        colonCount--;
      }
      if (string.substr(-2, 2) === "::") {
        colonCount--;
      }
      if (colonCount > parts) {
        return null;
      }
      replacementCount = parts - colonCount;
      replacement = ":";
      while (replacementCount--) {
        replacement += "0:";
      }
      string = string.replace("::", replacement);
      if (string[0] === ":") {
        string = string.slice(1);
      }
      if (string[string.length - 1] === ":") {
        string = string.slice(0, -1);
      }
      parts = function() {
        var k, len, ref, results;
        ref = string.split(":");
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(parseInt(part, 16));
        }
        return results;
      }();
      return {
        parts,
        zoneId
      };
    };
    ipaddr2.IPv6.parser = function(string) {
      var addr, k, len, match, octet, octets, zoneId;
      if (ipv6Regexes["native"].test(string)) {
        return expandIPv6(string, 8);
      } else if (match = string.match(ipv6Regexes["transitional"])) {
        zoneId = match[6] || "";
        addr = expandIPv6(match[1].slice(0, -1) + zoneId, 6);
        if (addr.parts) {
          octets = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5])];
          for (k = 0, len = octets.length; k < len; k++) {
            octet = octets[k];
            if (!(0 <= octet && octet <= 255)) {
              return null;
            }
          }
          addr.parts.push(octets[0] << 8 | octets[1]);
          addr.parts.push(octets[2] << 8 | octets[3]);
          return {
            parts: addr.parts,
            zoneId: addr.zoneId
          };
        }
      }
      return null;
    };
    ipaddr2.IPv4.isIPv4 = ipaddr2.IPv6.isIPv6 = function(string) {
      return this.parser(string) !== null;
    };
    ipaddr2.IPv4.isValid = function(string) {
      try {
        new this(this.parser(string));
        return true;
      } catch (error1) {
        return false;
      }
    };
    ipaddr2.IPv4.isValidFourPartDecimal = function(string) {
      if (ipaddr2.IPv4.isValid(string) && string.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/)) {
        return true;
      } else {
        return false;
      }
    };
    ipaddr2.IPv6.isValid = function(string) {
      var addr;
      if (typeof string === "string" && string.indexOf(":") === -1) {
        return false;
      }
      try {
        addr = this.parser(string);
        new this(addr.parts, addr.zoneId);
        return true;
      } catch (error1) {
        return false;
      }
    };
    ipaddr2.IPv4.parse = function(string) {
      var parts;
      parts = this.parser(string);
      if (parts === null) {
        throw new Error("ipaddr: string is not formatted like ip address");
      }
      return new this(parts);
    };
    ipaddr2.IPv6.parse = function(string) {
      var addr;
      addr = this.parser(string);
      if (addr.parts === null) {
        throw new Error("ipaddr: string is not formatted like ip address");
      }
      return new this(addr.parts, addr.zoneId);
    };
    ipaddr2.IPv4.parseCIDR = function(string) {
      var maskLength, match, parsed;
      if (match = string.match(/^(.+)\/(\d+)$/)) {
        maskLength = parseInt(match[2]);
        if (maskLength >= 0 && maskLength <= 32) {
          parsed = [this.parse(match[1]), maskLength];
          Object.defineProperty(parsed, "toString", {
            value: function() {
              return this.join("/");
            }
          });
          return parsed;
        }
      }
      throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
    };
    ipaddr2.IPv4.subnetMaskFromPrefixLength = function(prefix) {
      var filledOctetCount, j, octets;
      prefix = parseInt(prefix);
      if (prefix < 0 || prefix > 32) {
        throw new Error("ipaddr: invalid IPv4 prefix length");
      }
      octets = [0, 0, 0, 0];
      j = 0;
      filledOctetCount = Math.floor(prefix / 8);
      while (j < filledOctetCount) {
        octets[j] = 255;
        j++;
      }
      if (filledOctetCount < 4) {
        octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - prefix % 8;
      }
      return new this(octets);
    };
    ipaddr2.IPv4.broadcastAddressFromCIDR = function(string) {
      var cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
      try {
        cidr = this.parseCIDR(string);
        ipInterfaceOctets = cidr[0].toByteArray();
        subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
        octets = [];
        i = 0;
        while (i < 4) {
          octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
          i++;
        }
        return new this(octets);
      } catch (error1) {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    };
    ipaddr2.IPv4.networkAddressFromCIDR = function(string) {
      var cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
      try {
        cidr = this.parseCIDR(string);
        ipInterfaceOctets = cidr[0].toByteArray();
        subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
        octets = [];
        i = 0;
        while (i < 4) {
          octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
          i++;
        }
        return new this(octets);
      } catch (error1) {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    };
    ipaddr2.IPv6.parseCIDR = function(string) {
      var maskLength, match, parsed;
      if (match = string.match(/^(.+)\/(\d+)$/)) {
        maskLength = parseInt(match[2]);
        if (maskLength >= 0 && maskLength <= 128) {
          parsed = [this.parse(match[1]), maskLength];
          Object.defineProperty(parsed, "toString", {
            value: function() {
              return this.join("/");
            }
          });
          return parsed;
        }
      }
      throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
    };
    ipaddr2.isValid = function(string) {
      return ipaddr2.IPv6.isValid(string) || ipaddr2.IPv4.isValid(string);
    };
    ipaddr2.parse = function(string) {
      if (ipaddr2.IPv6.isValid(string)) {
        return ipaddr2.IPv6.parse(string);
      } else if (ipaddr2.IPv4.isValid(string)) {
        return ipaddr2.IPv4.parse(string);
      } else {
        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
      }
    };
    ipaddr2.parseCIDR = function(string) {
      try {
        return ipaddr2.IPv6.parseCIDR(string);
      } catch (error1) {
        try {
          return ipaddr2.IPv4.parseCIDR(string);
        } catch (error12) {
          throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
        }
      }
    };
    ipaddr2.fromByteArray = function(bytes) {
      var length;
      length = bytes.length;
      if (length === 4) {
        return new ipaddr2.IPv4(bytes);
      } else if (length === 16) {
        return new ipaddr2.IPv6(bytes);
      } else {
        throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
      }
    };
    ipaddr2.process = function(string) {
      var addr;
      addr = this.parse(string);
      if (addr.kind() === "ipv6" && addr.isIPv4MappedAddress()) {
        return addr.toIPv4Address();
      } else {
        return addr;
      }
    };
  }).call(commonjsGlobal);
});
var ip6 = createCommonjsModule(function(module, exports) {
  const normalize = function(a) {
    if (!_validate(a)) {
      throw new Error("Invalid address: " + a);
    }
    a = a.toLowerCase();
    const nh = a.split(/\:\:/g);
    if (nh.length > 2) {
      throw new Error("Invalid address: " + a);
    }
    let sections = [];
    if (nh.length == 1) {
      sections = a.split(/\:/g);
      if (sections.length !== 8) {
        throw new Error("Invalid address: " + a);
      }
    } else if (nh.length == 2) {
      const n = nh[0];
      const h = nh[1];
      const ns = n.split(/\:/g);
      const hs = h.split(/\:/g);
      for (let i in ns) {
        sections[i] = ns[i];
      }
      for (let i = hs.length; i > 0; --i) {
        sections[7 - (hs.length - i)] = hs[i - 1];
      }
    }
    for (let i = 0; i < 8; ++i) {
      if (sections[i] === void 0) {
        sections[i] = "0000";
      }
      sections[i] = _leftPad(sections[i], "0", 4);
    }
    return sections.join(":");
  };
  const abbreviate = function(a) {
    if (!_validate(a)) {
      throw new Error("Invalid address: " + a);
    }
    a = normalize(a);
    a = a.replace(/0000/g, "g");
    a = a.replace(/\:000/g, ":");
    a = a.replace(/\:00/g, ":");
    a = a.replace(/\:0/g, ":");
    a = a.replace(/g/g, "0");
    const sections = a.split(/\:/g);
    let zPreviousFlag = false;
    let zeroStartIndex = -1;
    let zeroLength = 0;
    let zStartIndex = -1;
    let zLength = 0;
    for (let i = 0; i < 8; ++i) {
      const section = sections[i];
      let zFlag = section === "0";
      if (zFlag && !zPreviousFlag) {
        zStartIndex = i;
      }
      if (!zFlag && zPreviousFlag) {
        zLength = i - zStartIndex;
      }
      if (zLength > 1 && zLength > zeroLength) {
        zeroStartIndex = zStartIndex;
        zeroLength = zLength;
      }
      zPreviousFlag = section === "0";
    }
    if (zPreviousFlag) {
      zLength = 8 - zStartIndex;
    }
    if (zLength > 1 && zLength > zeroLength) {
      zeroStartIndex = zStartIndex;
      zeroLength = zLength;
    }
    if (zeroStartIndex >= 0 && zeroLength > 1) {
      sections.splice(zeroStartIndex, zeroLength, "g");
    }
    a = sections.join(":");
    a = a.replace(/\:g\:/g, "::");
    a = a.replace(/\:g/g, "::");
    a = a.replace(/g\:/g, "::");
    a = a.replace(/g/g, "::");
    return a;
  };
  const _validate = function(a) {
    return /^[a-f0-9\\:]+$/ig.test(a);
  };
  const _leftPad = function(d, p, n) {
    const padding = p.repeat(n);
    if (d.length < padding.length) {
      d = padding.substring(0, padding.length - d.length) + d;
    }
    return d;
  };
  const _hex2bin = function(hex) {
    return parseInt(hex, 16).toString(2);
  };
  const _bin2hex = function(bin) {
    return parseInt(bin, 2).toString(16);
  };
  const _addr2bin = function(addr) {
    const nAddr = normalize(addr);
    const sections = nAddr.split(":");
    let binAddr = "";
    for (const section of sections) {
      binAddr += _leftPad(_hex2bin(section), "0", 16);
    }
    return binAddr;
  };
  const _bin2addr = function(bin) {
    const addr = [];
    for (let i = 0; i < 8; ++i) {
      const binPart = bin.substr(i * 16, 16);
      const hexSection = _leftPad(_bin2hex(binPart), "0", 4);
      addr.push(hexSection);
    }
    return addr.join(":");
  };
  const divideSubnet = function(addr, mask0, mask1, limit, abbr) {
    if (!_validate(addr)) {
      throw new Error("Invalid address: " + addr);
    }
    mask0 *= 1;
    mask1 *= 1;
    limit *= 1;
    mask1 = mask1 || 128;
    if (mask0 < 1 || mask1 < 1 || mask0 > 128 || mask1 > 128 || mask0 > mask1) {
      throw new Error("Invalid masks.");
    }
    const ret = [];
    const binAddr = _addr2bin(addr);
    const binNetPart = binAddr.substr(0, mask0);
    const binHostPart = "0".repeat(128 - mask1);
    const numSubnets = Math.pow(2, mask1 - mask0);
    for (let i = 0; i < numSubnets; ++i) {
      if (!!limit && i >= limit) {
        break;
      }
      const binSubnet = _leftPad(i.toString(2), "0", mask1 - mask0);
      const binSubAddr = binNetPart + binSubnet + binHostPart;
      const hexAddr = _bin2addr(binSubAddr);
      if (!!abbr) {
        ret.push(abbreviate(hexAddr));
      } else {
        ret.push(hexAddr);
      }
    }
    return ret;
  };
  const range = function(addr, mask0, mask1, abbr) {
    if (!_validate(addr)) {
      throw new Error("Invalid address: " + addr);
    }
    mask0 *= 1;
    mask1 *= 1;
    mask1 = mask1 || 128;
    if (mask0 < 1 || mask1 < 1 || mask0 > 128 || mask1 > 128 || mask0 > mask1) {
      throw new Error("Invalid masks.");
    }
    const binAddr = _addr2bin(addr);
    const binNetPart = binAddr.substr(0, mask0);
    const binHostPart = "0".repeat(128 - mask1);
    const binStartAddr = binNetPart + "0".repeat(mask1 - mask0) + binHostPart;
    const binEndAddr = binNetPart + "1".repeat(mask1 - mask0) + binHostPart;
    if (!!abbr) {
      return {
        start: abbreviate(_bin2addr(binStartAddr)),
        end: abbreviate(_bin2addr(binEndAddr)),
        size: Math.pow(2, mask1 - mask0)
      };
    } else {
      return {
        start: _bin2addr(binStartAddr),
        end: _bin2addr(binEndAddr),
        size: Math.pow(2, mask1 - mask0)
      };
    }
  };
  const randomSubnet = function(addr, mask0, mask1, limit, abbr) {
    if (!_validate(addr)) {
      throw new Error("Invalid address: " + addr);
    }
    mask0 *= 1;
    mask1 *= 1;
    limit *= 1;
    mask1 = mask1 || 128;
    limit = limit || 1;
    if (mask0 < 1 || mask1 < 1 || mask0 > 128 || mask1 > 128 || mask0 > mask1) {
      throw new Error("Invalid masks.");
    }
    const ret = [];
    const binAddr = _addr2bin(addr);
    const binNetPart = binAddr.substr(0, mask0);
    const binHostPart = "0".repeat(128 - mask1);
    const numSubnets = Math.pow(2, mask1 - mask0);
    for (let i = 0; i < numSubnets && i < limit; ++i) {
      let binSubnet = "";
      for (let j = 0; j < mask1 - mask0; ++j) {
        binSubnet += Math.floor(Math.random() * 2);
      }
      const binSubAddr = binNetPart + binSubnet + binHostPart;
      const hexAddr = _bin2addr(binSubAddr);
      if (!!abbr) {
        ret.push(abbreviate(hexAddr));
      } else {
        ret.push(hexAddr);
      }
    }
    return ret;
  };
  const ptr = function(addr, mask) {
    if (!_validate(addr)) {
      throw new Error("Invalid address: " + addr);
    }
    mask *= 1;
    if (mask < 1 || mask > 128 || Math.floor(mask / 4) != mask / 4) {
      throw new Error("Invalid masks.");
    }
    const fullAddr = normalize(addr);
    const reverse = fullAddr.replace(/:/g, "").split("").reverse();
    return reverse.slice(0, (128 - mask) / 4).join(".");
  };
  {
    exports.normalize = normalize;
    exports.abbreviate = abbreviate;
    exports.divideSubnet = divideSubnet;
    exports.range = range;
    exports.randomSubnet = randomSubnet;
    exports.ptr = ptr;
  }
});
var ip6_1 = ip6.normalize;
var ip6_2 = ip6.abbreviate;
var ip6_3 = ip6.divideSubnet;
var ip6_4 = ip6.range;
var ip6_5 = ip6.randomSubnet;
var ip6_6 = ip6.ptr;
function isIP(addr) {
  return ipaddr.isValid(addr);
}
function version(addr) {
  try {
    var parse_addr = ipaddr.parse(addr);
    var kind = parse_addr.kind();
    if (kind === "ipv4") {
      return 4;
    } else if (kind === "ipv6") {
      return 6;
    } else {
      return 0;
    }
  } catch (err) {
    return 0;
  }
}
function isV6(addr) {
  return version(addr) === 6;
}
function inRange(addr, range) {
  if (typeof range === "string") {
    if (range.indexOf("/") !== -1) {
      try {
        var range_data = range.split("/");
        var parse_addr = ipaddr.parse(addr);
        var parse_range = ipaddr.parse(range_data[0]);
        return parse_addr.match(parse_range, range_data[1]);
      } catch (err) {
        return false;
      }
    } else {
      addr = isV6(addr) ? ip6.normalize(addr) : addr;
      range = isV6(range) ? ip6.normalize(range) : range;
      return isIP(range) && addr === range;
    }
  } else if (range && typeof range === "object") {
    for (var check_range in range) {
      if (inRange(addr, range[check_range]) === true) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

// src/dns.js
var import_buffer = __toESM(require_buffer());
var errno2 = 0;
var errno = function(v) {
  if (v === void 0)
    return errno2;
  errno2 = v;
};
var ENODEV = 19;
var EINVAL = 22;
var EMSGSIZE = 90;
function copy(src, target, targetStart, sourceStart, sourceEnd) {
  while (sourceStart < sourceEnd) {
    target[targetStart++] = src[sourceStart++];
  }
}
var MessageHeader = class {
  constructor() {
    this.id = 0;
    this.qr = 0;
    this.opcode = 0;
    this.aa = 0;
    this.tc = 0;
    this.rd = 0;
    this.ra = 0;
    this.z = 0;
    this.ad = 0;
    this.cd = 0;
    this.rcode = 0;
    this.qdcount = 0;
    this.ancount = 0;
    this.nscount = 0;
    this.arcount = 0;
  }
};
var MessageQuestion = class {
  constructor(name, type, klass) {
    this.name = name;
    this.type = type;
    this.class = klass;
  }
};
var MessageRR = class {
  constructor(name, type, klass, ttl, rdata = []) {
    this.name = name;
    this.type = type;
    this.class = klass;
    this.ttl = ttl;
    this.rdata = rdata;
  }
};
var Ptr = class {
  constructor(val) {
    this.p = val;
  }
  get() {
    return this.p;
  }
  set(val) {
    return this.p = val;
  }
};
var NS_MAXDNAME = 1025;
var NS_MAXCDNAME = 255;
var NS_INT32SZ = 4;
var NS_INT16SZ = 2;
var NS_CMPRSFLGS = 192;
var ns_sect = {
  "qd": 0,
  "zn": 0,
  "an": 1,
  "pr": 1,
  "ns": 2,
  "ud": 2,
  "ar": 3,
  "max": 4
};
var ns_flag = {
  "qr": 0,
  "opcode": 1,
  "aa": 2,
  "tc": 3,
  "rd": 4,
  "ra": 5,
  "z": 6,
  "ad": 7,
  "cd": 8,
  "rcode": 9,
  "max": 10
};
var ns_type = {
  "invalid": 0,
  "a": 1,
  "ns": 2,
  "md": 3,
  "mf": 4,
  "cname": 5,
  "soa": 6,
  "mb": 7,
  "mg": 8,
  "mr": 9,
  "null": 10,
  "wks": 11,
  "ptr": 12,
  "hinfo": 13,
  "minfo": 14,
  "mx": 15,
  "txt": 16,
  "rp": 17,
  "afsdb": 18,
  "x25": 19,
  "isdn": 20,
  "rt": 21,
  "nsap": 22,
  "ns_nsap_ptr": 23,
  "sig": 24,
  "key": 25,
  "px": 26,
  "gpos": 27,
  "aaaa": 28,
  "loc": 29,
  "nxt": 30,
  "eid": 31,
  "nimloc": 32,
  "srv": 33,
  "atma": 34,
  "naptr": 35,
  "kx": 36,
  "cert": 37,
  "a6": 38,
  "dname": 39,
  "sink": 40,
  "opt": 41,
  "apl": 42,
  "ds": 43,
  "sshfp": 44,
  "ipseckey": 45,
  "rrsig": 46,
  "nsec": 47,
  "dnskey": 48,
  "dhcid": 49,
  "nsec3": 50,
  "nsec3param": 51,
  "hip": 55,
  "spf": 99,
  "tkey": 249,
  "tsig": 250,
  "ixfr": 251,
  "axfr": 252,
  "mailb": 253,
  "maila": 254,
  "any": 255,
  "zxfr": 256,
  "dlv": 32769,
  "max": 65536
};
var ns_flagdata = [
  { mask: 32768, shift: 15 },
  { mask: 30720, shift: 11 },
  { mask: 1024, shift: 10 },
  { mask: 512, shift: 9 },
  { mask: 256, shift: 8 },
  { mask: 128, shift: 7 },
  { mask: 64, shift: 6 },
  { mask: 32, shift: 5 },
  { mask: 16, shift: 4 },
  { mask: 15, shift: 0 },
  { mask: 0, shift: 0 },
  { mask: 0, shift: 0 },
  { mask: 0, shift: 0 },
  { mask: 0, shift: 0 },
  { mask: 0, shift: 0 },
  { mask: 0, shift: 0 }
];
var ns_msg = class ns_msg2 {
  constructor() {
    this._buf = null;
    this._msg = null;
    this._eom = 0;
    this._id = 0;
    this._flags = 0;
    this._counts = new Array(ns_sect.max);
    this._sections = new Array(ns_sect.max);
    this._sect = 0;
    this._rrnum = 0;
    this._msg_ptr = 0;
  }
  getId() {
    return this._id;
  }
  getBase() {
    return this._msg;
  }
  getSize() {
    return this._eom;
  }
  getCount(section) {
    return this._counts[section];
  }
  getFlag(flag) {
    if (flag > 0 && flag < ns_flagdata.length)
      return (this._flags & ns_flagdata[flag].mask) >> ns_flagdata[flag].shift;
    return 0;
  }
};
var ns_rr2 = class ns_rr22 {
  constructor() {
    this.nname = import_buffer.Buffer.alloc(NS_MAXDNAME);
    this.nnamel = 0;
    this.type = 0;
    this.rr_class = 0;
    this.ttl = 0;
    this.rdlength = 0;
    this.rdata = null;
  }
};
function dn_skipname(buf, ptr, eom) {
  const saveptr = ptr;
  const ptrptr = new Ptr(ptr);
  if (ns_name_skip(buf, ptrptr, eom) === -1) {
    return -1;
  }
  return ptrptr.get() - saveptr;
}
function ns_skiprr(buf, ptr, eom, section, count) {
  const optr = ptr;
  for (let i = 0; i < count; i++) {
    let rdlength;
    const b = dn_skipname(buf, ptr, eom);
    if (b < 0) {
      return -1;
    }
    ptr += b + NS_INT16SZ + NS_INT16SZ;
    if (section !== ns_sect.qd) {
      if (ptr + NS_INT32SZ + NS_INT16SZ > eom)
        return -1;
      ptr += NS_INT32SZ;
      rdlength = buf[ptr] * 256 + buf[ptr + 1];
      ptr += NS_INT16SZ;
      ptr += rdlength;
    }
  }
  if (ptr > eom) {
    errno(EMSGSIZE);
    return -1;
  }
  return ptr - optr;
}
function ns_initparse(buf, buflen, handle) {
  let msg = 0;
  const eom = buflen;
  let i;
  handle._buf = buf;
  handle._msg = 0;
  handle._eom = eom;
  if (msg + NS_INT16SZ > eom)
    return -1;
  handle._id = buf[msg] * 256 + buf[msg + 1];
  msg += NS_INT16SZ;
  if (msg + NS_INT16SZ > eom)
    return -1;
  handle._flags = buf[msg] * 256 + buf[msg + 1];
  msg += NS_INT16SZ;
  for (i = 0; i < ns_sect.max; i++) {
    if (msg + NS_INT16SZ > eom)
      return -1;
    handle._counts[i] = buf[msg] * 256 + buf[msg + 1];
    msg += NS_INT16SZ;
  }
  for (i = 0; i < ns_sect.max; i++) {
    if (handle._counts[i] === 0) {
      handle._sections[i] = null;
    } else {
      const b = ns_skiprr(buf, msg, eom, i, handle._counts[i]);
      if (b < 0) {
        return -1;
      }
      handle._sections[i] = msg;
      msg += b;
    }
  }
  if (msg !== eom)
    return -1;
  setsection(handle, ns_sect.max);
  return 0;
}
function ns_parserr2(handle, section, rrnum, rr) {
  let b;
  const tmp = section;
  if (tmp < 0 || section >= ns_sect.max) {
    errno(ENODEV);
    return -1;
  }
  if (section !== handle._sect)
    setsection(handle, section);
  if (rrnum === -1)
    rrnum = handle._rrnum;
  if (rrnum < 0 || rrnum >= handle._counts[section]) {
    errno(ENODEV);
    return -1;
  }
  if (rrnum < handle._rrnum)
    setsection(handle, section);
  if (rrnum > handle._rrnum) {
    b = ns_skiprr(handle._buf, handle._msg_ptr, handle._eom, section, rrnum - handle._rrnum);
    if (b < 0)
      return -1;
    handle._msg_ptr += b;
    handle._rrnum = rrnum;
  }
  const nnamelp = new Ptr();
  b = ns_name_unpack2(handle._buf, handle._msg_ptr, handle._eom, rr.nname, rr.nname.length, nnamelp);
  if (b < 0)
    return -1;
  rr.nnamel = nnamelp.get();
  handle._msg_ptr += b;
  if (handle._msg_ptr + NS_INT16SZ + NS_INT16SZ > handle._eom) {
    errno(EMSGSIZE);
    return -1;
  }
  rr.type = handle._buf[handle._msg_ptr] * 256 + handle._buf[handle._msg_ptr + 1];
  handle._msg_ptr += NS_INT16SZ;
  rr.rr_class = handle._buf[handle._msg_ptr] * 256 + handle._buf[handle._msg_ptr + 1];
  handle._msg_ptr += NS_INT16SZ;
  if (section === ns_sect.qd) {
    rr.ttl = 0;
    rr.rdlength = 0;
    rr.rdata = null;
  } else {
    if (handle._msg_ptr + NS_INT32SZ + NS_INT16SZ > handle._eom) {
      errno(EMSGSIZE);
      return -1;
    }
    rr.ttl = handle._buf[handle._msg_ptr] * 16777216 + handle._buf[handle._msg_ptr + 1] * 65536 + handle._buf[handle._msg_ptr + 2] * 256 + handle._buf[handle._msg_ptr + 3];
    handle._msg_ptr += NS_INT32SZ;
    rr.rdlength = handle._buf[handle._msg_ptr] * 256 + handle._buf[handle._msg_ptr + 1];
    handle._msg_ptr += NS_INT16SZ;
    if (handle._msg_ptr + rr.rdlength > handle._eom) {
      errno(EMSGSIZE);
      return -1;
    }
    rr.rdata = handle._msg_ptr;
    handle._msg_ptr += rr.rdlength;
  }
  if (++handle._rrnum > handle._counts[section])
    setsection(handle, section + 1);
  return 0;
}
function setsection(msg, sect) {
  msg._sect = sect;
  if (sect === ns_sect.max) {
    msg._rrnum = -1;
    msg._msg_ptr = null;
  } else {
    msg._rrnum = 0;
    msg._msg_ptr = msg._sections[sect];
  }
}
var hexvalue = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff"
];
var _dname = import_buffer.Buffer.alloc(NS_MAXDNAME);
var _string = import_buffer.Buffer.alloc(NS_MAXDNAME);
var _ptr = new Ptr();
var RDataParser = class {
  constructor() {
    this.msg = null;
    this.eom = 0;
    this.rdata = 0;
    this.rdlen = 0;
    this.nrdata = null;
    this.active = false;
  }
  initialize(msg, eom, rdata, rdlen, nrdata) {
    this.msg = msg;
    this.eom = eom;
    this.rdata = rdata;
    this.rdlen = rdlen;
    this.nrdata = nrdata;
    this.active = true;
  }
  finalize() {
    this.active = false;
    return this.rdlen === 0;
  }
  consume(n) {
    if (this.active) {
      if (this.rdlen < n) {
        this.active = false;
      } else {
        this.rdata += n;
        this.rdlen -= n;
      }
    }
    return this.active;
  }
  IPv4() {
    if (this.consume(4)) {
      const { msg, rdata } = this;
      const item = [
        msg[rdata - 4],
        msg[rdata - 3],
        msg[rdata - 2],
        msg[rdata - 1]
      ].join(".");
      this.nrdata.push(item);
    }
  }
  IPv6() {
    if (this.consume(16)) {
      const { msg, rdata } = this;
      const item = [
        hexvalue[msg[rdata - 16]] + hexvalue[msg[rdata - 15]],
        hexvalue[msg[rdata - 14]] + hexvalue[msg[rdata - 13]],
        hexvalue[msg[rdata - 12]] + hexvalue[msg[rdata - 11]],
        hexvalue[msg[rdata - 10]] + hexvalue[msg[rdata - 9]],
        hexvalue[msg[rdata - 8]] + hexvalue[msg[rdata - 7]],
        hexvalue[msg[rdata - 6]] + hexvalue[msg[rdata - 5]],
        hexvalue[msg[rdata - 4]] + hexvalue[msg[rdata - 3]],
        hexvalue[msg[rdata - 2]] + hexvalue[msg[rdata - 1]]
      ].join(":");
      this.nrdata.push(item);
    }
  }
  name() {
    let len, n;
    if (this.active) {
      if ((len = ns_name_unpack(this.msg, this.rdata, this.rdlen, _dname, _dname.length)) === -1) {
        this.active = false;
        return;
      }
      if ((n = ns_name_ntop(_dname, _string, _string.length)) === -1) {
        this.active = false;
        return;
      }
      const item = _string.toString("ascii", 0, n);
      if (this.consume(len)) {
        this.nrdata.push(item);
      }
    }
  }
  UInt32() {
    if (this.consume(4)) {
      const item = this.msg[this.rdata - 4] * 16777216 + this.msg[this.rdata - 3] * 65536 + this.msg[this.rdata - 2] * 256 + this.msg[this.rdata - 1];
      this.nrdata.push(item);
    }
  }
  UInt16() {
    if (this.consume(2)) {
      const item = this.msg[this.rdata - 2] * 256 + this.msg[this.rdata - 1];
      this.nrdata.push(item);
    }
  }
  UInt8() {
    if (this.consume(1)) {
      const item = this.msg[this.rdata - 1];
      this.nrdata.push(item);
    }
  }
  string(n) {
    if (this.consume(n)) {
      const item = this.msg.toString("ascii", this.rdata - n, this.rdata);
      this.nrdata.push(item);
    }
  }
  txt() {
    if (this.active) {
      let item = "";
      if (this.rdlen > 0 && this.consume(1)) {
        const n = this.msg[this.rdata - 1];
        if (this.consume(n)) {
          const tmp = this.msg.toString("ascii", this.rdata - n, this.rdata);
          item += tmp;
        } else {
          this.active = false;
          return;
        }
      }
      this.nrdata.push(item);
    }
  }
  rest() {
    if (this.consume(this.rdlen)) {
      const item = this.msg.slice(this.rdata - this.rdlen, this.rdata);
      this.nrdata.push(item);
    }
  }
};
var _rdataParser = new RDataParser();
function ns_rdata_unpack(msg, eom, type, rdata, rdlen, nrdata) {
  _rdataParser.initialize(msg, eom, rdata, rdlen, nrdata);
  switch (type) {
    case ns_type.a:
      _rdataParser.IPv4();
      break;
    case ns_type.aaaa:
      _rdataParser.IPv6();
      break;
    case ns_type.cname:
    case ns_type.mb:
    case ns_type.mg:
    case ns_type.mr:
    case ns_type.ns:
    case ns_type.ptr:
    case ns_type.dname:
      _rdataParser.name();
      break;
    case ns_type.soa:
      _rdataParser.name();
      _rdataParser.name();
      _rdataParser.UInt32();
      _rdataParser.UInt32();
      _rdataParser.UInt32();
      _rdataParser.UInt32();
      _rdataParser.UInt32();
      break;
    case ns_type.mx:
    case ns_type.afsdb:
    case ns_type.rt:
      _rdataParser.UInt16();
      _rdataParser.name();
      break;
    case ns_type.px:
      _rdataParser.UInt16();
      _rdataParser.name();
      _rdataParser.name();
      break;
    case ns_type.srv:
      _rdataParser.UInt16();
      _rdataParser.UInt16();
      _rdataParser.UInt16();
      _rdataParser.name();
      break;
    case ns_type.minfo:
    case ns_type.rp:
      _rdataParser.name();
      _rdataParser.name();
      break;
    case ns_type.txt:
      _rdataParser.txt();
      break;
    default:
      _rdataParser.rest();
  }
  if (_rdataParser.finalize() === false) {
    errno(EMSGSIZE);
    return -1;
  }
  return 0;
}
function RDataWriter() {
  this.srdata = null;
  this.buf = null;
  this.ordata = 0;
  this.rdata = 0;
  this.rdsiz = 0;
  this.nconsumed = 0;
  this.nitem = 0;
  this.active = false;
}
RDataWriter.prototype.initialize = function(srdata, buf, rdata, rdsiz) {
  this.srdata = srdata;
  this.buf = buf;
  this.ordata = rdata;
  this.rdata = rdata;
  this.rdsiz = rdsiz;
  this.nconsumed = 0;
  this.nitem = 0;
  this.active = true;
};
RDataWriter.prototype.consume = function(n) {
  if (this.active) {
    if (this.rdsiz < n) {
      this.active = false;
    } else {
      this.rdata += n;
      this.rdsiz -= n;
      this.nconsumed += n;
    }
  }
  return this.active;
};
RDataWriter.prototype.next = function() {
  let item;
  if (this.nitem < this.srdata.length) {
    item = this.srdata[this.nitem++];
  }
  return item;
};
RDataWriter.prototype.IPv4 = function() {
  let item = this.next();
  if (this.consume(4)) {
    if (typeof item === "string") {
      item = item.split(".");
    } else if (!import_buffer.Buffer.isBuffer(item) && !Array.isArray(item)) {
      item = item.toString().split(".");
    }
    if (item.length < 4) {
      this.active = false;
      return;
    }
    this.buf[this.rdata - 4] = Number.parseInt(item[0], 10);
    this.buf[this.rdata - 3] = Number.parseInt(item[1], 10);
    this.buf[this.rdata - 2] = Number.parseInt(item[2], 10);
    this.buf[this.rdata - 1] = Number.parseInt(item[3], 10);
  }
};
RDataWriter.prototype.IPv6 = function() {
  const item = this.next();
  if (this.consume(16)) {
    if (import_buffer.Buffer.isBuffer(item) || Array.isArray(item)) {
      if (item.length < 16) {
        this.active = false;
        return;
      }
      this.buf[this.rdata - 16] = item[0];
      this.buf[this.rdata - 15] = item[1];
      this.buf[this.rdata - 14] = item[2];
      this.buf[this.rdata - 13] = item[3];
      this.buf[this.rdata - 12] = item[4];
      this.buf[this.rdata - 11] = item[5];
      this.buf[this.rdata - 10] = item[6];
      this.buf[this.rdata - 9] = item[7];
      this.buf[this.rdata - 8] = item[8];
      this.buf[this.rdata - 7] = item[9];
      this.buf[this.rdata - 6] = item[10];
      this.buf[this.rdata - 5] = item[11];
      this.buf[this.rdata - 3] = item[12];
      this.buf[this.rdata - 2] = item[13];
      this.buf[this.rdata - 1] = item[14];
      this.buf[this.rdata - 1] = item[15];
    } else {
      const tmp = item.toString().split(":");
      if (tmp.length < 8) {
        this.active = false;
        return;
      }
      for (let i = 0; i < 8; i++) {
        const n = Number.parseInt(tmp[i], 16);
        this.buf[this.rdata - 16 + i * 2] = n >> 8;
        this.buf[this.rdata - 15 + i * 2] = n >> 0;
      }
    }
  }
};
RDataWriter.prototype.name = function() {
  const item = this.next();
  let len, n;
  if (this.active) {
    if (import_buffer.Buffer.isBuffer(item)) {
      len = item.length;
      if (len + 1 > _string.length) {
        this.active = false;
        return;
      }
      copy(item, _string, 0, 0, len);
      _string[len] = 0;
      if (ns_name_pton2(_string, _dname, _dname.length, _ptr) === -1) {
        this.active = false;
        return;
      }
      n = _ptr.get();
      if (this.consume(n)) {
        copy(_dname, this.buf, this.rdata - n, 0, n);
      }
    }
    if (typeof item === "string") {
      if ((len = _string.write(item, 0)) === _string.length) {
        this.active = false;
        return;
      }
      _string[len] = 0;
      if (ns_name_pton2(_string, _dname, _dname.length, _ptr) === -1) {
        this.active = false;
        return;
      }
      n = _ptr.get();
      if (this.consume(n)) {
        copy(_dname, this.buf, this.rdata - n, 0, n);
      }
    } else {
      this.active = false;
      return;
    }
  }
};
RDataWriter.prototype.UInt32 = function() {
  let item = this.next();
  if (this.consume(4)) {
    if (import_buffer.Buffer.isBuffer(item) || Array.isArray(item)) {
      if (item.length < 4) {
        this.active = false;
        return;
      }
      this.buf[this.rdata - 4] = item[0];
      this.buf[this.rdata - 3] = item[1];
      this.buf[this.rdata - 2] = item[2];
      this.buf[this.rdata - 1] = item[3];
    } else {
      if (typeof item !== "number") {
        item = Number.parseInt(item, 10);
      }
      this.buf[this.rdata - 4] = item >> 24;
      this.buf[this.rdata - 3] = item >> 16;
      this.buf[this.rdata - 2] = item >> 8;
      this.buf[this.rdata - 1] = item >> 0;
    }
  }
};
RDataWriter.prototype.UInt16 = function() {
  let item = this.next();
  if (this.consume(2)) {
    if (import_buffer.Buffer.isBuffer(item) || Array.isArray(item)) {
      if (item.length < 2) {
        this.active = false;
        return;
      }
      this.buf[this.rdata - 2] = item[0];
      this.buf[this.rdata - 1] = item[1];
    } else {
      if (typeof item !== "number") {
        item = Number.parseInt(item, 10);
      }
      this.buf[this.rdata - 2] = item >> 8;
      this.buf[this.rdata - 1] = item >> 0;
    }
  }
};
RDataWriter.prototype.UInt8 = function() {
  let item = this.next();
  if (this.consume(1)) {
    if (import_buffer.Buffer.isBuffer(item) || Array.isArray(item)) {
      if (item.length < 1) {
        this.active = false;
        return;
      }
      this.buf[this.rdata - 1] = item[0];
    } else {
      if (typeof item !== "number") {
        item = Number.parseInt(item, 10);
      }
      this.buf[this.rdata - 1] = item;
    }
  }
};
RDataWriter.prototype.txt = function() {
  const item = this.next();
  let n;
  if (this.active) {
    if (typeof item === "string") {
      if ((n = _string.write(item, 0)) === _string.length) {
        this.active = false;
        return;
      }
      if (n > 0 && this.consume(1)) {
        this.buf[this.rdata - 1] = n;
        if (this.consume(n)) {
          copy(_string, this.buf, this.rdata - n, 0, n);
        } else {
          this.active = false;
          return;
        }
      }
    } else if (import_buffer.Buffer.isBuffer(item)) {
      n = item.length;
      if (n > 0 && this.consume(1)) {
        this.buf[this.rdata - 1] = n;
        if (this.consume(n)) {
          copy(item, this.buf, this.rdata - n, 0, n);
        } else {
          this.active = false;
          return;
        }
      }
    }
  }
};
RDataWriter.prototype.rest = function() {
  this.consume(this.rdsiz);
};
var _rdataWriter = new RDataWriter();
var DNS_LABELTYPE_BITSTRING = 65;
var NS_TYPE_ELT = 64;
var digits = "0123456789";
var digitvalue = [
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  10,
  11,
  12,
  13,
  14,
  15,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  12,
  11,
  12,
  13,
  14,
  15,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
];
function ns_name_ntop(src, dst, dstsiz) {
  let cp = 0;
  let dn = 0;
  const eom = dstsiz;
  let c;
  let n;
  let l;
  while ((n = src[cp++]) !== 0) {
    if ((n & NS_CMPRSFLGS) === NS_CMPRSFLGS) {
      errno(EMSGSIZE);
      return -1;
    }
    if (dn !== 0) {
      if (dn >= eom) {
        errno(EMSGSIZE);
        return -1;
      }
      dst[dn++] = 46;
    }
    if ((l = labellen(src, cp - 1)) < 0) {
      errno(EMSGSIZE);
      return -1;
    }
    if (dn + l >= eom) {
      errno(EMSGSIZE);
      return -1;
    }
    if ((n & NS_CMPRSFLGS) === NS_TYPE_ELT) {
      let m;
      if (n !== DNS_LABELTYPE_BITSTRING) {
        errno(EINVAL);
        return -1;
      }
      const cpp = new Ptr(cp);
      if ((m = decode_bitstring(src, cpp, dst, dn, eom)) < 0) {
        errno(EMSGSIZE);
        return -1;
      }
      cp = cpp.get();
      dn += m;
      continue;
    }
    for (; l > 0; l--) {
      c = src[cp++];
      if (special(c)) {
        if (dn + 1 >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        dst[dn++] = 92;
        dst[dn++] = c;
      } else if (!printable(c)) {
        if (dn + 3 >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        dst[dn++] = 92;
        dst[dn++] = digits[c / 100 | 0].charCodeAt(0);
        dst[dn++] = digits[c % 100 / 10 | 0].charCodeAt(0);
        dst[dn++] = digits[c % 10].charCodeAt(0);
      } else {
        if (dn >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        dst[dn++] = c;
      }
    }
  }
  if (dn === 0) {
    if (dn >= eom) {
      errno(EMSGSIZE);
      return -1;
    }
    dst[dn++] = 46;
  }
  if (dn >= eom) {
    errno(EMSGSIZE);
    return -1;
  }
  dst[dn] = 0;
  return dn;
}
function ns_name_pton2(src, dst, dstsiz, dstlenp) {
  let c, n;
  let cp;
  let e = 0;
  let escaped = 0;
  let bp = 0;
  const eom = dstsiz;
  let label = bp++;
  let srcn = 0;
  let done = false;
  while ((c = src[srcn++]) !== 0) {
    if (escaped) {
      if (c === 91) {
        if ((cp = strchr(src, srcn, 93)) === null) {
          errno(EINVAL);
          return -1;
        }
        const srcp = new Ptr(srcn);
        const bpp = new Ptr(bp);
        const labelp = new Ptr(label);
        e = encode_bitstring(src, srcp, cp + 2, labelp, dst, bpp, eom);
        if (e !== 0) {
          errno(e);
          return -1;
        }
        label = labelp.get();
        bp = bpp.get();
        srcn = srcp.get();
        escaped = 0;
        label = bp++;
        if ((c = src[srcn++]) === 0) {
          done = true;
          break;
        }
      } else if ((cp = digits.indexOf(String.fromCharCode(c))) !== -1) {
        n = cp * 100;
        if ((c = src[srcn++]) || (cp = digits.indexOf(String.fromCharCode(c))) === -1) {
          errno(EMSGSIZE);
          return -1;
        }
        n += cp * 10;
        if ((c = src[srcn++]) === 0 || (cp = digits.indexOf(String.fromCharCode(c))) === -1) {
          errno(EMSGSIZE);
          return -1;
        }
        n += cp;
        if (n > 255) {
          errno(EMSGSIZE);
          return -1;
        }
        c = n;
      }
      escaped = 0;
    } else if (c === 92) {
      escaped = 1;
      continue;
    } else if (c === 46) {
      c = bp - label - 1;
      if ((c & NS_CMPRSFLGS) !== 0) {
        errno(EMSGSIZE);
        return -1;
      }
      if (label >= eom) {
        errno(EMSGSIZE);
        return -1;
      }
      dst[label] = c;
      if (src[srcn] === 0) {
        if (c !== 0) {
          if (bp >= eom) {
            errno(EMSGSIZE);
            return -1;
          }
          dst[bp++] = 0;
        }
        if (bp > NS_MAXCDNAME) {
          errno(EMSGSIZE);
          return -1;
        }
        if (dstlenp !== null) {
          dstlenp.set(bp);
        }
        return 1;
      }
      if (c === 0 || src[srcn] === 46) {
        errno(EMSGSIZE);
        return -1;
      }
      label = bp++;
      continue;
    }
    if (bp >= eom) {
      errno(EMSGSIZE);
      return -1;
    }
    dst[bp++] = c;
  }
  if (!done) {
    c = bp - label - 1;
    if ((c & NS_CMPRSFLGS) !== 0) {
      errno(EMSGSIZE);
      return -1;
    }
  }
  if (label >= eom) {
    errno(EMSGSIZE);
    return -1;
  }
  dst[label] = c;
  if (c !== 0) {
    if (bp >= eom) {
      errno(EMSGSIZE);
      return -1;
    }
    dst[bp++] = 0;
  }
  if (bp > NS_MAXCDNAME) {
    errno(EMSGSIZE);
    return -1;
  }
  if (dstlenp !== null) {
    dstlenp.set(bp);
  }
  return 0;
}
function strchr(src, off, c) {
  while (off < src.length && src[off] !== 0) {
    if (src[off] === c)
      return off;
    off++;
  }
  return null;
}
function ns_name_unpack(msg, offset, len, dst, dstsiz) {
  return ns_name_unpack2(msg, offset, len, dst, dstsiz, null);
}
function ns_name_unpack2(msg, offset, len, dst, dstsiz, dstlenp) {
  let n, l;
  let llen = -1;
  let checked = 0;
  let dstn = 0;
  let srcn = offset;
  const dstlim = dstsiz;
  const eom = offset + len;
  if (srcn < 0 || srcn >= eom) {
    errno(EMSGSIZE);
    return -1;
  }
  while ((n = msg[srcn++]) !== 0 && !isNaN(srcn)) {
    switch (n & NS_CMPRSFLGS) {
      case 0:
      case NS_TYPE_ELT:
        if ((l = labellen(msg, srcn - 1)) < 0) {
          errno(EMSGSIZE);
          return -1;
        }
        if (dstn + l + 1 >= dstlim || srcn + l >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        checked += l + 1;
        dst[dstn++] = n;
        copy(msg, dst, dstn, srcn, srcn + l);
        dstn += l;
        srcn += l;
        break;
      case NS_CMPRSFLGS:
        if (srcn >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        if (llen < 0) {
          llen = srcn - offset + 1;
        }
        srcn = (n & 63) * 256 | msg[srcn] & 255;
        if (srcn < 0 || srcn >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        checked += 2;
        if (checked >= eom) {
          errno(EMSGSIZE);
          return -1;
        }
        break;
      default:
        errno(EMSGSIZE);
        return -1;
    }
  }
  dst[dstn] = 0;
  if (dstlenp !== null)
    dstlenp.set(dstn);
  if (llen < 0)
    llen = srcn - offset;
  return llen;
}
function ns_name_skip(b, ptrptr, eom) {
  let cp;
  let n;
  let l;
  cp = ptrptr.get();
  while (cp < eom && (n = b[cp++]) !== 0) {
    switch (n & NS_CMPRSFLGS) {
      case 0:
        cp += n;
        continue;
      case NS_TYPE_ELT:
        if ((l = labellen(b, cp - 1)) < 0) {
          errno(EMSGSIZE);
          return -1;
        }
        cp += l;
        continue;
      case NS_CMPRSFLGS:
        cp++;
        break;
      default:
        errno(EMSGSIZE);
        return -1;
    }
    break;
  }
  if (cp > eom) {
    errno(EMSGSIZE);
    return -1;
  }
  ptrptr.set(cp);
  return 0;
}
function special(ch) {
  switch (ch) {
    case 34:
    case 46:
    case 59:
    case 92:
    case 40:
    case 41:
    case 64:
    case 36:
      return true;
    default:
      return false;
  }
}
function printable(ch) {
  return ch > 32 && ch < 127;
}
function decode_bitstring(b, cpp, d, dn, eom) {
  let cp = cpp.get();
  let blen, plen;
  if ((blen = b[cp] & 255) === 0)
    blen = 256;
  plen = (blen + 3) / 4;
  plen += "\\[x/]".length + (blen > 99 ? 3 : blen > 9 ? 2 : 1);
  if (dn + plen >= eom)
    return -1;
  cp++;
  const i = d.write("\\[x", dn);
  if (i !== 3)
    return -1;
  dn += i;
  for (b = blen; b > 7; b -= 8, cp++) {
    if (dn + 2 >= eom)
      return -1;
  }
}
function encode_bitstring(src, bp, end, labelp, dst, dstp, eom) {
  let afterslash = 0;
  let cp = bp.get();
  let tp;
  let c;
  let beg_blen;
  let end_blen = null;
  let value = 0, count = 0, tbcount = 0, blen = 0;
  beg_blen = end_blen = null;
  if (end - cp < 2)
    return EINVAL;
  if (src[cp++] !== 120)
    return EINVAL;
  if (!isxdigit(src[cp] & 255))
    return EINVAL;
  let done = false;
  for (tp = dstp.get() + 1; cp < end && tp < eom; cp++) {
    switch (c = src[cp++]) {
      case 93:
        if (afterslash) {
          if (beg_blen === null)
            return EINVAL;
          blen = strtol(src, beg_blen, 10);
        }
        if (count)
          dst[tp++] = value << 4 & 255;
        cp++;
        done = true;
        break;
      case 47:
        afterslash = 1;
        break;
      default:
        if (afterslash) {
          if (!isxdigit(c & 255))
            return EINVAL;
          if (beg_blen === null) {
            if (c === 48) {
              return EINVAL;
            }
            beg_blen = cp;
          }
        } else {
          if (!isxdigit(c & 255))
            return EINVAL;
          value <<= 4;
          value += digitvalue[c];
          count += 4;
          tbcount += 4;
          if (tbcount > 256)
            return EINVAL;
          if (count === 8) {
            dst[tp++] = value;
            count = 0;
          }
        }
        break;
    }
    if (done) {
      break;
    }
  }
  if (cp >= end || tp >= eom)
    return EMSGSIZE;
  if (blen && blen > 0) {
    if ((blen + 3 & ~3) !== tbcount)
      return EINVAL;
    const traillen = tbcount - blen;
    if ((value << 8 - traillen & 255) !== 0)
      return EINVAL;
  } else
    blen = tbcount;
  if (blen === 256)
    blen = 0;
  src[labelp.get()] = DNS_LABELTYPE_BITSTRING;
  dst[dstp.get()] = blen;
  bp.set(cp);
  dstp.set(tp);
  return 0;
}
function labellen(b, off) {
  let bitlen;
  const l = b[off];
  if ((l & NS_CMPRSFLGS) === NS_CMPRSFLGS) {
    return -1;
  }
  if ((l & NS_CMPRSFLGS) === NS_TYPE_ELT) {
    if (l === DNS_LABELTYPE_BITSTRING) {
      bitlen = b[off + 1];
      if (bitlen === 0) {
        bitlen = 256;
      }
      return 1 + (bitlen + 7) / 8;
    }
  }
  return l;
}
function isxdigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 97 && ch <= 102 || ch >= 65 && ch <= 70;
}
function strtol(b, off, base) {
  return Number.parseInt(b.toString("ascii", off), base);
}
var _msg = new ns_msg();
var _rr = new ns_rr2();
var Message = class {
  constructor() {
    this.header = new MessageHeader();
    this.question = new Array();
    this.answer = new Array();
    this.authoritative = new Array();
    this.additional = new Array();
  }
  addRR(sect, name, type, klass, ttl, ...info) {
    let rr;
    if (sect === ns_sect.qd) {
      rr = new MessageQuestion(name, type, klass);
    } else {
      rr = new MessageRR(name, type, klass, ttl, info);
    }
    switch (sect) {
      case ns_sect.qd:
        this.question.push(rr);
        this.header.qdcount++;
        break;
      case ns_sect.an:
        this.answer.push(rr);
        this.header.ancount++;
        break;
      case ns_sect.ns:
        this.authoritative.push(rr);
        this.header.nscount++;
        break;
      case ns_sect.ar:
        this.additional.push(rr);
        this.header.arcount++;
        break;
    }
  }
  parseOnce(buf) {
    if (ns_initparse(buf, buf.length, _msg) === -1)
      return false;
    this.header.id = _msg.getId();
    this.header.qr = _msg.getFlag(ns_flag.qr);
    this.header.opcode = _msg.getFlag(ns_flag.opcode);
    this.header.aa = _msg.getFlag(ns_flag.aa);
    this.header.tc = _msg.getFlag(ns_flag.tc);
    this.header.rd = _msg.getFlag(ns_flag.rd);
    this.header.ra = _msg.getFlag(ns_flag.ra);
    this.header.z = _msg.getFlag(ns_flag.a);
    this.header.ad = _msg.getFlag(ns_flag.ad);
    this.header.cd = _msg.getFlag(ns_flag.cd);
    this.header.rcode = _msg.getFlag(ns_flag.rcode);
    this.header.qdcount = _msg.getCount(ns_sect.qd);
    this.header.ancount = _msg.getCount(ns_sect.an);
    this.header.nscount = _msg.getCount(ns_sect.ns);
    this.header.arcount = _msg.getCount(ns_sect.ar);
    let len;
    for (let section = 0; section < ns_sect.max; section++) {
      for (let rrnum = 0; rrnum < _msg.getCount(section); rrnum++) {
        if (ns_parserr2(_msg, section, rrnum, _rr) === -1)
          return false;
        if ((len = ns_name_ntop(_rr.nname, _dname, _dname.length)) === -1)
          return false;
        const name = _dname.toString("ascii", 0, len);
        let rr;
        if (section === ns_sect.qd) {
          rr = new MessageQuestion(name, _rr.type, _rr.rr_class);
        } else {
          rr = new MessageRR(name, _rr.type, _rr.rr_class, _rr.ttl);
          if (ns_rdata_unpack(buf, buf.length, _rr.type, _rr.rdata, _rr.rdlength, rr.rdata) === -1)
            return -1;
        }
        switch (section) {
          case ns_sect.qd:
            this.question.push(rr);
            break;
          case ns_sect.an:
            this.answer.push(rr);
            break;
          case ns_sect.ns:
            this.authoritative.push(rr);
            break;
          case ns_sect.ar:
            this.additional.push(rr);
            break;
        }
      }
    }
    return true;
  }
};

// src/worker.ts
var proxyIPs = ["relay1.bepass.org", "relay2.bepass.org", "relay3.bepass.org"];
var proxyPort = 6666;
var proxyIP = proxyIPs[0];
var dnsHost = "1.1.1.1";
var WS_READY_STATE_OPEN = 1;
var WS_READY_STATE_CLOSING = 2;
var cf_ipv4 = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22"
];
var cf_ipv6 = [
  "2400:cb00::/32",
  "2606:4700::/32",
  "2803:f800::/32",
  "2405:b500::/32",
  "2405:8100::/32",
  "2a06:98c0::/29",
  "2c0f:f248::/32"
];
var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/dns-query":
        url.hostname = dnsHost;
        return await fetch(url.toString());
      case "/connect":
        return await bepassOverWs(request);
      default:
        const result = await lookup("www.google.com");
        return new Response(`{"status": 'dns functions normally, example resolve returned: ` + result + "'}", {
          status: 200,
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
    }
  }
};
async function bepassOverWs(request) {
  const params = {};
  const url = new URL(request.url);
  const queryString = url.search.slice(1).split("&");
  queryString.forEach((item) => {
    const kv = item.split("=");
    if (kv[0])
      params[kv[0]] = kv[1] || true;
  });
  const destinationHost = params["host"];
  const destinationPort = params["port"];
  proxyIP = params["session"] ? proxyIPs[parseInt(params["session"]) % proxyIPs.length] : proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
  const destinationNetwork = params["net"] ? params["net"].toString().toLowerCase() : "tcp";
  const webSocketPair = new WebSocketPair();
  const [client, webSocket] = Object.values(webSocketPair);
  webSocket.accept();
  let address = "";
  let portWithRandomLog = "";
  const log = (info, event) => {
    console.log(`[${address}:${portWithRandomLog}] ${info}`, event || "");
  };
  const readableWebSocketStream = makeReadableWebSocketStream(webSocket, log);
  let remoteSocketWapper = {
    value: null
  };
  readableWebSocketStream.pipeTo(new WritableStream({
    async write(chunk, controller) {
      if (remoteSocketWapper.value) {
        const writer = remoteSocketWapper.value.writable.getWriter();
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
    }
  })).catch((err) => {
    log("readableWebSocketStream pipeTo error", err);
  });
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}
function makeReadableWebSocketStream(webSocketServer, log) {
  let readableStreamCancel = false;
  const stream = new ReadableStream({
    start(controller) {
      webSocketServer.addEventListener("message", (event) => {
        if (readableStreamCancel) {
          return;
        }
        const message = event.data;
        controller.enqueue(message);
      });
      webSocketServer.addEventListener(
        "close",
        () => {
          safeCloseWebSocket(webSocketServer);
          if (readableStreamCancel) {
            return;
          }
          controller.close();
        }
      );
      webSocketServer.addEventListener(
        "error",
        (err) => {
          log("webSocketServer has error");
          controller.error(err);
        }
      );
    },
    cancel(reason) {
      if (readableStreamCancel) {
        return;
      }
      log(`ReadableStream was canceled, due to ${reason}`);
      readableStreamCancel = true;
      safeCloseWebSocket(webSocketServer);
    }
  });
  return stream;
}
async function handleTCPOutBound(remoteSocket, destinationNetwork, addressRemote, portRemote, rawClientData, webSocket, log) {
  async function connectAndWrite(address, port, rawHeaderEnabled) {
    address = address.replace("[", "").replace("]", "");
    const mmd = destinationNetwork + "@" + addressRemote + "$" + portRemote;
    if (!isIP(address)) {
      const ip = await lookup(address);
      if (ip) {
        address = ip;
      }
    }
    if (destinationNetwork === "udp" || !rawHeaderEnabled && isIP(address) && (inRange(address, cf_ipv6) || inRange(address, cf_ipv4))) {
      address = proxyIP;
      port = proxyPort;
      rawHeaderEnabled = true;
    }
    if (address.includes(":")) {
      address = "[" + address + "]";
    }
    const tcpSocket2 = connect({
      hostname: address,
      port
    });
    remoteSocket.value = tcpSocket2;
    if (rawHeaderEnabled) {
      const writer = tcpSocket2.writable.getWriter();
      try {
        const header = new TextEncoder().encode(mmd + "\r\n");
        await writer.write(header);
      } catch (writeError) {
        writer.releaseLock();
        await tcpSocket2.close();
        return new Response(writeError.message, { status: 500 });
      }
      writer.releaseLock();
    }
    return tcpSocket2;
  }
  async function retry() {
    const tcpSocket2 = await connectAndWrite(proxyIP, proxyPort, true);
    safeCloseWebSocket(webSocket);
    remoteSocketToWS(tcpSocket2, webSocket, null, log);
  }
  const tcpSocket = await connectAndWrite(addressRemote, portRemote, false);
  remoteSocketToWS(tcpSocket, webSocket, retry, log);
}
async function remoteSocketToWS(remoteSocket, webSocket, retry, log) {
  let remoteChunkCount = 0;
  let chunks = [];
  let hasIncomingData = false;
  await remoteSocket.readable.pipeTo(
    new WritableStream({
      start() {
      },
      async write(chunk, controller) {
        hasIncomingData = true;
        if (webSocket.readyState !== WS_READY_STATE_OPEN) {
          controller.error(
            "webSocket.readyState is not open, maybe close"
          );
        }
        webSocket.send(chunk);
      },
      close() {
        log(`remoteConnection!.readable is close with hasIncomingData is ${hasIncomingData}`);
      },
      abort(reason) {
        console.error(`remoteConnection!.readable abort`, reason);
      }
    })
  ).catch((error) => {
    console.error(
      `remoteSocketToWS has exception `,
      error.stack || error
    );
    safeCloseWebSocket(webSocket);
  });
  if (!hasIncomingData && retry) {
    log(`retry`);
    retry();
  }
}
function safeCloseWebSocket(socket) {
  try {
    if (socket.readyState === WS_READY_STATE_OPEN || socket.readyState === WS_READY_STATE_CLOSING) {
      socket.close();
    }
  } catch (error) {
    console.error("safeCloseWebSocket error", error);
  }
}
function createDnsQuery(domain) {
  const buf = import_buffer2.Buffer.alloc(512);
  buf.writeUInt16BE(4660, 0);
  buf.writeUInt16BE(256, 2);
  buf.writeUInt16BE(1, 4);
  buf.writeUInt16BE(0, 6);
  buf.writeUInt16BE(0, 8);
  buf.writeUInt16BE(0, 10);
  let offset = 12;
  const parts = domain.split(".");
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    buf.writeUInt8(part.length, offset);
    buf.write(part, offset + 1);
    offset += part.length + 1;
  }
  buf.writeUInt8(0, offset++);
  buf.writeUInt16BE(1, offset);
  buf.writeUInt16BE(1, offset + 2);
  return buf.slice(0, offset + 4);
}
function parseResponse(b) {
  const buffer = import_buffer2.Buffer.from(b);
  const x = new Message();
  x.parseOnce(buffer);
  if (x.answer.length > 0 && x.answer[0].rdata.length > 0 && x.answer[0].rdata[0]) {
    return x.answer[0].rdata[0];
  }
  return null;
}
async function lookup(domain) {
  const dnsQuery = createDnsQuery(domain);
  const resp = await fetch(`https://${dnsHost}/dns-query`, {
    method: "POST",
    headers: { "Content-Type": "application/dns-message" },
    body: dnsQuery
  });
  return parseResponse(await resp.arrayBuffer());
}
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
