import { Buffer } from 'buffer'

let errno2 = 0;
/**
 * Gets/sets the "global" `errno`.
 * @param {number} v
 */
const errno = function (v) {
	if (v === undefined) return errno2;
	errno2 = v;
};

/** No such file or directory */
const ENOENT = 2;
/** No such device */
const ENODEV = 19;
/** Is a directory */
const EISDIR = 21;
/** Invalid argument */
const EINVAL = 22;
/** File name too long */
const ENAMETOOLONG = 36;
/** Message too long */
const EMSGSIZE = 90;

function copy(src, target, targetStart, sourceStart, sourceEnd) {
	while (sourceStart < sourceEnd) {
		target[targetStart++] = src[sourceStart++];
	}
};

class MessageHeader {
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

class MessageQuestion {
	/**
	 *
	 * @param {string} name
	 * @param {ns_type_t} type
	 * @param {ns_class_t} klass
	 */
	constructor(name, type, klass) {
		this.name = name;
		this.type = type;
		this.class = klass;
	}
};

class MessageRR {
	/**
	 *
	 * @param {string} name
	 * @param {ns_type_t} type
	 * @param {ns_class_t} klass
	 * @param {number} ttl
	 * @param {Array<*>} [rdata]
	 */
	constructor(name, type, klass, ttl, rdata = []) {
		this.name = name;
		this.type = type;
		this.class = klass;
		this.ttl = ttl;
		this.rdata = rdata;
	}
};

class Ptr {
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

/** Default UDP Packet size */
const NS_PACKETSZ = 512;
/** Maximum domain name */
const NS_MAXDNAME = 1025;
/** Maximum message size */
const NS_MAXMSG = 65535;
/** Maximum compressed domain name */
const NS_MAXCDNAME = 255;
/** Maximum compressed domain label */
const NS_MAXLABEL = 63;
/** Bytes of fixed data in header */
const NS_HFIXEDSZ = 12;
/** Bytes of fixed data in query */
const NS_QFIXEDSZ = 4;
/** Bytes of fixed data in r record */
const NS_RRFIXEDSZ = 10;
/** Bytes of data in a u_int32_t */
const NS_INT32SZ = 4;
/** Bytes of data in a u_int16_t */
const NS_INT16SZ = 2;
/** Bytes of data in a u_int8_t */
const NS_INT8SZ = 1;
/** IPv4 T_A */
const NS_INADDRSZ = 4;
/** IPv6 T_AAAA */
const NS_IN6ADDRSZ = 16;
/** Flag bits indicating name compression. */
const NS_CMPRSFLGS = 0xc0;
/** For both UDP and TCP. */
const NS_DEFAULTPORT = 53;

/** Section constants */
const ns_sect = {
	/** Query: Question. */                             "qd": 0,
	/** Update: Zone. */                                "zn": 0,
	/** Query: Answer. */                               "an": 1,
	/** Update: Prerequisites. */                       "pr": 1,
	/** Query: Name servers. */                         "ns": 2,
	/** Query: Update. */                               "ud": 2,
	/** Query|Update: Additional records. */            "ar": 3,
	"max": 4,
};

/** Flag constants */
const ns_flag = {
	/** Question/Response. */                           "qr": 0,
	/** Operation code. */                              "opcode": 1,
	/** Authoritative Answer. */                        "aa": 2,
	/** Truncation occured. */                          "tc": 3,
	/** Recursion Desired. */                           "rd": 4,
	/** Recursion Available. */                         "ra": 5,
	/** MBZ */                                          "z": 6,
	/** Authentic Data (DNSSEC) */                      "ad": 7,
	/** Checking Disabled (DNSSEC) */                   "cd": 8,
	/** Response code. */                               "rcode": 9,
	"max": 10,
};

/** Currently defined opcodes. */
const ns_opcode = {
	/** Standard query. */                              "query": 0,
	/** Inverse query (deprecated/unsupported). */      "iquery": 1,
	/** Name server status query (unsupported). */      "status": 2,
	// Opcode 3 is undefined/reserved
	/** Zone change notification. */                    "notify": 4,
	/** Zone update message. */                         "update": 5,
};

/** Currently defined response codes */
const ns_rcode = {
	/** No error occured. */                            "noerror": 0,
	/** Format error. */                                "formerr": 1,
	/** Server failure. */                              "servfail": 2,
	/** Name error. */                                  "nxdomain": 3,
	/** Unimplemented. */                               "notimpl": 4,
	/** Operation refused. */                           "refused": 5,
	// These are for BIND_UPDATE
	/** Name exists */                                  "yxdomain": 6,
	/** RRset exists */                                 "yxrrset": 7,
	/** RRset does not exist */                         "nxrrset": 8,
	/** Not authoritative for zone */                   "notauth": 9,
	/** Zone of record different from zone section */   "notzone": 10,
	"max": 11,
	// The following are EDNS extended rcodes
	"badvers": 16,
	// The following are TSIG errors
	"badsig": 16,
	"badkey": 17,
	"badtime": 18,
};

// BIND_UPDATE
const ns_update_operation = {
	"delete": 0,
	"add": 1,
	"max": 2,
};

const NS_TSIG_FUDGE = 300;
const NS_TSIG_TCP_COUNT = 100;
const NS_TSIG_ALG_HMAC_MD5 = "HMAC-MD5.SIG-ALG.REG.INT";
const NS_TSIG_ERROR_NO_TSIG = -10,
	NS_TSIG_ERROR_NO_SPACE = -11,
	NS_TSIG_ERROR_FORMERR = -12,

	/** @typedef {number} ns_type_t */

	/**
	 * Currently defined type values for resources and queries.
	 * @enum {ns_type_t}
	 */
	ns_type = {
		/** Cookie. */                                      "invalid": 0,
		/** Host address. */                                "a": 1,
		/** Authoritative server. */                        "ns": 2,
		/** Mail destinaion. */                             "md": 3,
		/** Mail forwarder. */                              "mf": 4,
		/** Canonical name. */                              "cname": 5,
		/** Start of authority zone. */                     "soa": 6,
		/** Mailbox domain name. */                         "mb": 7,
		/** Mail group member. */                           "mg": 8,
		/** Mail rename name. */                            "mr": 9,
		/** Null resource record. */                        "null": 10,
		/** Well known service. */                          "wks": 11,
		/** Domain name pointer. */                         "ptr": 12,
		/** Host information. */                            "hinfo": 13,
		/** Mailbox information. */                         "minfo": 14,
		/** Mail routing information. */                    "mx": 15,
		/** Text strings. */                                "txt": 16,
		/** Responsible person. */                          "rp": 17,
		/** AFS cell database. */                           "afsdb": 18,
		/** X_25 calling address. */                        "x25": 19,
		/** ISDN calling address. */                        "isdn": 20,
		/** Router. */                                      "rt": 21,
		/** NSAP address. */                                "nsap": 22,
		/** Reverse NSAP lookup (deprecated) */             "ns_nsap_ptr": 23,
		/** Security signature. */                          "sig": 24,
		/** Security key. */                                "key": 25,
		/** X.400 mail mapping. */                          "px": 26,
		/** Geographical position (withdrawn). */           "gpos": 27,
		/** Ip6 Address. */                                 "aaaa": 28,
		/** Location Information. */                        "loc": 29,
		/** Next domain (security) */                       "nxt": 30,
		/** Endpoint identifier. */                         "eid": 31,
		/** Nimrod Locator. */                              "nimloc": 32,
		/** Server Selection. */                            "srv": 33,
		/** ATM Address */                                  "atma": 34,
		/** Naming Authority PoinTeR */                     "naptr": 35,
		/** Key Exchange */                                 "kx": 36,
		/** Certification Record */                         "cert": 37,
		/** IPv6 Address (deprecated, use ns_t.aaaa) */     "a6": 38,
		/** Non-terminal DNAME (for IPv6) */                "dname": 39,
		/** Kitchen sink (experimental) */                  "sink": 40,
		/** EDNS0 option (meta-RR) */                       "opt": 41,
		/** Address prefix list (RFC3123) */                "apl": 42,
		/** Delegation Signer */                            "ds": 43,
		/** SSH Fingerprint */                              "sshfp": 44,
		/** IPSEC Key */                                    "ipseckey": 45,
		/** RRSet Signature */                              "rrsig": 46,
		/** Negative Security */                            "nsec": 47,
		/** DNS Key */                                      "dnskey": 48,
		/** Dynamic host configuartion identifier */        "dhcid": 49,
		/** Negative security type 3 */                     "nsec3": 50,
		/** Negative security type 3 parameters */          "nsec3param": 51,
		/** Host Identity Protocol */                       "hip": 55,
		/** Sender Policy Framework */                      "spf": 99,
		/** Transaction key */                              "tkey": 249,
		/** Transaction signature. */                       "tsig": 250,
		/** Incremental zone transfer. */                   "ixfr": 251,
		/** Transfer zone of authority. */                  "axfr": 252,
		/** Transfer mailbox records. */                    "mailb": 253,
		/** Transfer mail agent records. */                 "maila": 254,
		/** Wildcard match. */                              "any": 255,
		/** BIND-specific, nonstandard. */                  "zxfr": 256,
		/** DNSSEC look-aside validation. */                "dlv": 32769,
		"max": 65536
	};

/**
 * Returns the type (string) for the `type` (number).
 * This function is not fast. It could be made into an O(1) if needed.
 * @param {number} type
 * @return {string}
 */
const ns_type_str = function (type) {
	const types = ns_type;
	for (const str in types) if (types[str] === type) return str.toUpperCase();
};

/** @typedef {number} ns_class_t */

/**
 * Values for class field
 * @enum {ns_class_t}
 */
const ns_class = {
	/** Cookie. */                                      "invalid": 0,
	/** Internet. */                                    "in": 1,
	/** unallocated/unsupported. */                     "2": 2,
	/** MIT Chaos-net. */                               "chaos": 3,
	/** MIT Hesoid. */                                  "hs": 4,
	// Query class values which do not appear in resource records
	/** for prereq. sections in update requests */      "none": 254,
	/** Wildcard match. */                              "any": 255,
	"max": 65535,
};

// DNSSEC constants.
const ns_key_types = {
	/** key type RSA/MD5 */                             "rsa": 1,
	/** Diffie Hellman */                               "dh": 2,
	/** Digital Signature Standard (MANDATORY) */       "dsa": 3,
	/** Private key type starts with OID */             "private": 4
};

const ns_cert_types = {
	/** PKIX (X.509v3) */                               "pkix": 1,
	/** SPKI */                                         "spki": 2,
	/** PGP */                                          "pgp": 3,
	/** URL private type */                             "url": 253,
	/** OID private type */                             "oid": 254
};

// In libbind, this struct and the methods like ns_msg_getflag live in
// ns_parse.c.
const ns_flagdata = [
	{mask: 0x8000, shift: 15}, // qr.
	{mask: 0x7800, shift: 11}, // opcode.
	{mask: 0x0400, shift: 10}, // aa.
	{mask: 0x0200, shift: 9}, // tc.
	{mask: 0x0100, shift: 8}, // rd.
	{mask: 0x0080, shift: 7}, // ra.
	{mask: 0x0040, shift: 6}, // z.
	{mask: 0x0020, shift: 5}, // ad.
	{mask: 0x0010, shift: 4}, // cd.
	{mask: 0x000f, shift: 0}, // rcode.
	{mask: 0x0000, shift: 0}, // expansion (1/6).
	{mask: 0x0000, shift: 0}, // expansion (2/6).
	{mask: 0x0000, shift: 0}, // expansion (3/6).
	{mask: 0x0000, shift: 0}, // expansion (4/6).
	{mask: 0x0000, shift: 0}, // expansion (5/6).
	{mask: 0x0000, shift: 0}, // expansion (6/6).
];

/**
 * This is a message handle. It is caller-allocated and has no dynamic data.
 * This structure is intended to be opaque to all but ns_parse.c, thus the
 * leading _'s on the member names. Use the accessor functions, not the _'s.
 */
const ns_msg = class ns_msg {
	constructor() {
		this._buf = null; // not in original
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

/**
 * This is a newmsg handle, used when constructing new messages with
 * ns_newmsg_init, et al.
 */
const ns_newmsg = class ns_newmsg {
	constructor() {
		this.msg = new ns_msg();
		this.dnptrs = new Array(25);
		this.lastdnptr = this.dnptrs.length;
	}

	setId(id) {
		this.msg._id = id;
	}

	setFlag(flag, value) {
		this.msg._flags &= ~ns_flagdata[flag].mask;
		this.msg._flags |= value << ns_flagdata[flag].shift;
	}
};

/**
 * A parsed record, using uncompressed network binary names.
 */
const ns_rr2 = class ns_rr2 {
	constructor() {
		this.nname = Buffer.alloc(NS_MAXDNAME);
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
			if (ptr + NS_INT32SZ + NS_INT16SZ > eom) return -1;
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

	if (msg + NS_INT16SZ > eom) return -1;
	handle._id = buf[msg] * 256 + buf[msg + 1];
	msg += NS_INT16SZ;

	if (msg + NS_INT16SZ > eom) return -1;
	handle._flags = buf[msg] * 256 + buf[msg + 1];
	msg += NS_INT16SZ;

	for (i = 0; i < ns_sect.max; i++) {
		if (msg + NS_INT16SZ > eom) return -1;
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

	if (msg !== eom) return -1;
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
	if (section !== handle._sect) setsection(handle, section);

	if (rrnum === -1) rrnum = handle._rrnum;
	if (rrnum < 0 || rrnum >= handle._counts[section]) {
		errno(ENODEV);
		return -1;
	}
	if (rrnum < handle._rrnum) setsection(handle, section);
	if (rrnum > handle._rrnum) {
		b = ns_skiprr(handle._buf, handle._msg_ptr, handle._eom, section, rrnum - handle._rrnum);
		if (b < 0) return -1;
		handle._msg_ptr += b;
		handle._rrnum = rrnum;
	}
	// do the parse
	const nnamelp = new Ptr();
	b = ns_name_unpack2(handle._buf, handle._msg_ptr, handle._eom, rr.nname, rr.nname.length, nnamelp);
	if (b < 0) return -1;
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
		rr.ttl = handle._buf[handle._msg_ptr] * 16777216 +
			handle._buf[handle._msg_ptr + 1] * 65536 +
			handle._buf[handle._msg_ptr + 2] * 256 +
			handle._buf[handle._msg_ptr + 3];
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
	if (++handle._rrnum > handle._counts[section]) setsection(handle, section + 1);

	// all done
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

const hexvalue = [
	"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f",
	"10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f",
	"20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f",
	"30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f",
	"40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f",
	"50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f",
	"60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f",
	"70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f",
	"80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f",
	"90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f",
	"a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af",
	"b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf",
	"c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf",
	"d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df",
	"e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef",
	"f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff",
];

// Performance: these buffers are reused. They could be localized within name().
const _dname = Buffer.alloc(NS_MAXDNAME);
const _string = Buffer.alloc(NS_MAXDNAME);
// Likewise:
const _ptr = new Ptr();

class RDataParser {
	constructor() {
		this.msg = null;
		this.eom = 0;
		this.rdata = 0;
		this.rdlen = 0;
		/** @type {Array<*>} */
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
			const {msg, rdata} = this;
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
			const {msg, rdata} = this;
			const item = [
				hexvalue[msg[rdata - 16]] +
				hexvalue[msg[rdata - 15]],
				hexvalue[msg[rdata - 14]] +
				hexvalue[msg[rdata - 13]],
				hexvalue[msg[rdata - 12]] +
				hexvalue[msg[rdata - 11]],
				hexvalue[msg[rdata - 10]] +
				hexvalue[msg[rdata - 9]],
				hexvalue[msg[rdata - 8]] +
				hexvalue[msg[rdata - 7]],
				hexvalue[msg[rdata - 6]] +
				hexvalue[msg[rdata - 5]],
				hexvalue[msg[rdata - 4]] +
				hexvalue[msg[rdata - 3]],
				hexvalue[msg[rdata - 2]] +
				hexvalue[msg[rdata - 1]]
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
			const item = this.msg[this.rdata - 4] * 16777216 +
				this.msg[this.rdata - 3] * 65536 +
				this.msg[this.rdata - 2] * 256 +
				this.msg[this.rdata - 1];
			this.nrdata.push(item);
		}
	}
	UInt16() {
		if (this.consume(2)) {
			const item = this.msg[this.rdata - 2] * 256 +
				this.msg[this.rdata - 1];
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
}

const _rdataParser = new RDataParser();
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
RDataWriter.prototype.initialize = function (srdata, buf, rdata, rdsiz) {
	this.srdata = srdata;
	this.buf = buf;
	this.ordata = rdata;
	this.rdata = rdata;
	this.rdsiz = rdsiz;

	this.nconsumed = 0;
	this.nitem = 0;

	this.active = true;
};
RDataWriter.prototype.consume = function (n) {
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
RDataWriter.prototype.next = function () {
	let item;
	if (this.nitem < this.srdata.length) {
		item = this.srdata[this.nitem++];
	}
	return item;
};
RDataWriter.prototype.IPv4 = function () {
	let item = this.next();
	if (this.consume(4)) {
		if (typeof item === "string") {
			item = item.split(".");
		} else if (!Buffer.isBuffer(item) && !Array.isArray(item)) {
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
RDataWriter.prototype.IPv6 = function () {
	const item = this.next();
	if (this.consume(16)) {
		if (Buffer.isBuffer(item) || Array.isArray(item)) {
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
RDataWriter.prototype.name = function () {
	const item = this.next();
	let len, n;
	if (this.active) {
		if (Buffer.isBuffer(item)) {
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
RDataWriter.prototype.UInt32 = function () {
	let item = this.next();
	if (this.consume(4)) {
		if (Buffer.isBuffer(item) || Array.isArray(item)) {
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
RDataWriter.prototype.UInt16 = function () {
	let item = this.next();
	if (this.consume(2)) {
		if (Buffer.isBuffer(item) || Array.isArray(item)) {
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
RDataWriter.prototype.UInt8 = function () {
	let item = this.next();
	if (this.consume(1)) {
		if (Buffer.isBuffer(item) || Array.isArray(item)) {
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
RDataWriter.prototype.txt = function () {
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
		} else if (Buffer.isBuffer(item)) {
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
RDataWriter.prototype.rest = function () {
	this.consume(this.rdsiz);
};

const _rdataWriter = new RDataWriter();
function ns_rdata_pack(type, srdata, buf, rdata, rdsiz) {
	/* javascript */
	_rdataWriter.initialize(srdata, buf, rdata, rdsiz);

	switch (type) {
		case ns_type.a:
			_rdataWriter.IPv4();
			break;
		case ns_type.aaaa:
			_rdataWriter.IPv6();
			break;
		case ns_type.cname:
		case ns_type.mb:
		case ns_type.mg:
		case ns_type.mr:
		case ns_type.ns:
		case ns_type.ptr:
		case ns_type.dname:
			_rdataWriter.name();
			break;
		case ns_type.soa:
			_rdataWriter.name();
			_rdataWriter.name();
			_rdataWriter.UInt32();
			_rdataWriter.UInt32();
			_rdataWriter.UInt32();
			_rdataWriter.UInt32();
			_rdataWriter.UInt32();
			break;
		case ns_type.mx:
		case ns_type.afsdb:
		case ns_type.rt:
			_rdataWriter.UInt16();
			_rdataWriter.name();
			break;
		case ns_type.px:
			_rdataWriter.UInt16();
			_rdataWriter.name();
			_rdataWriter.name();
			break;
		case ns_type.srv:
			_rdataWriter.UInt16();
			_rdataWriter.UInt16();
			_rdataWriter.UInt16();
			_rdataWriter.name();
			break;
		case ns_type.minfo:
		case ns_type.rp:
			_rdataWriter.name();
			_rdataWriter.name();
			break;
		case ns_type.txt:
			_rdataWriter.txt();
			break;
		default:
			_rdataWriter.rest();
	}

	if (_rdataWriter.active === false) {
		return -1;
	}

	//debug (util.inspect (buf.slice (rdata, _rdataWriter.nconsumed)));

	return _rdataWriter.nconsumed;
}

const DNS_LABELTYPE_BITSTRING = 0x41;
const NS_TYPE_ELT = 0x40; // edns0 extended label type

const digits = "0123456789";

const digitvalue = [
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 16
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 32
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 48
	0,   1,  2,  3,  4,  5,  6,  7,  8,  9, -1, -1, -1, -1, -1, -1, // 64
	-1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 80
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 96
	-1, 12, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 112
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 128
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 256
];

/**
 * @typedef {{base: number, len: number}} map_t
 */

/**
 * Convert an encoded domain name to printable ascii as per RFC1035. The root is
 * returned as ".". All other domains are returned in non absolute form.
 * @param {Buffer} src
 * @param {Buffer} dst
 * @param {number} dstsiz
 * @return {number} Number of bytes written to buffer, or -1 (with errno set).
 */
function ns_name_ntop(src, dst, dstsiz) {
	let cp = 0;
	let dn = 0;
	const eom = dstsiz;
	let c;
	let n;
	let l;

	while ((n = src[cp++]) !== 0) {
		if ((n & NS_CMPRSFLGS) === NS_CMPRSFLGS) {
			/* some kind of compression pointer */
			errno(EMSGSIZE);
			return -1;
		}
		if (dn !== 0) {
			if (dn >= eom) {
				errno(EMSGSIZE);
				return -1;
			}
			dst[dn++] = 0x2e; /* "." */
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
				/* XXX: labellen should reject this case */
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
				dst[dn++] = 0x5c; /* "\\" */
				dst[dn++] = c;
			} else if (!printable(c)) {
				if (dn + 3 >= eom) {
					errno(EMSGSIZE);
					return -1;
				}
				dst[dn++] = 0x5c; /* "\\" */
				// TODO(perf): no need to use charCodeAt, instead store array
				// of codes.
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
		dst[dn++] = 0x2e; // "."
	}
	if (dn >= eom) {
		errno(EMSGSIZE);
		return -1;
	}
	dst[dn] = 0;
	return dn;
}

/**
 * Convert a ascii string into an encoded domain name as per RFC1035. Enforces
 * label and domain length limits.
 * @param {Buffer} src
 * @param {Buffer} dst
 * @param {number} dstsiz
 * @return {number} -1 if it fails, 1 if string was fully qualified, 0 if string
 * was not fully qualified.
 */
function ns_name_pton(src, dst, dstsiz) {
	return ns_name_pton2(src, dst, dstsiz, null);
}

/**
 * Convert a ascii string into an encoded domain name as per RFC1035. Enforces
 * label and domain length limits. Side effect: fills in *dstlen (if non-NULL).
 * @param {Buffer} src
 * @param {Buffer} dst
 * @param {number} dstsiz
 * @param {Ptr} dstlenp
 * @return {number} -1 if it fails, 1 if string was fully qualified, 0 if string
 * was not fully qualified.
 */
function ns_name_pton2(src, dst, dstsiz, dstlenp) {
	let c, n;
	let cp;
	let e = 0;
	let escaped = 0;
	let bp = 0;
	const eom = dstsiz;
	let label = bp++;

	let srcn = 0;
	let done = false; // instead of goto
	while ((c = src[srcn++]) !== 0) {
		if (escaped) {
			if (c === 91) { // "["; start a bit string label
				if ((cp = strchr(src, srcn, 93)) === null) { // "]"
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
				if ((c = src[srcn++]) ||
					(cp = digits.indexOf(String.fromCharCode(c))) === -1) {
					errno(EMSGSIZE);
					return -1;
				}
				n += cp * 10;
				if ((c = src[srcn++]) === 0 ||
					(cp = digits.indexOf(String.fromCharCode(c))) === -1) {
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
		} else if (c === 92) { // "\\"
			escaped = 1;
			continue;
		} else if (c === 46) { // "."
			c = bp - label - 1;
			if ((c & NS_CMPRSFLGS) !== 0) { // label too big
				errno(EMSGSIZE);
				return -1;
			}
			if (label >= eom) {
				errno(EMSGSIZE);
				return -1;
			}
			dst[label] = c;
			// Fully qualified?
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
			if (c === 0 || src[srcn] === 46) { // "."
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
	// done:
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
	if (bp > NS_MAXCDNAME) { // src too big
		errno(EMSGSIZE);
		return -1;
	}
	if (dstlenp !== null) {
		dstlenp.set(bp);
	}
	return 0;
}

/**
 * Returns the position of the first occurrence of `c` in the null-terminated
 * string `src`.
 * @param {Buffer} src
 * @param {number} off
 * @param {number} c
 */
function strchr(src, off, c) {
	while (off < src.length && src[off] !== 0) {
		if (src[off] === c) return off;
		off++;
	}
	return null;
}

/**
 * Unpack a domain name from a message, source may be compressed.
 * @param {Buffer} msg
 * @param {number} offset
 * @param {number} len
 * @param {Buffer} dst
 * @param {number} dstsiz
 * @return {number} -1 if it fails, or consumed octets if it succeeds.
 */
function ns_name_unpack(msg, offset, len, dst, dstsiz) {
	return ns_name_unpack2(msg, offset, len, dst, dstsiz, null);
}

/**
 * Unpack a domain name from a message, source may be compressed. Side effect:
 * fills in *dstlen (if non-NULL).
 * @param {Buffer} msg
 * @param {number} offset
 * @param {number} len
 * @param {Buffer} dst
 * @param {number} dstsiz
 * @param {Ptr} dstlenp
 * @return {number} -1 if it fails, or consumed octets if it succeeds.
 */
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
	/* Fetch next label in domain name */
	while ((n = msg[srcn++]) !== 0 && !isNaN(srcn)) {
		/* Check for indirection */
		switch (n & NS_CMPRSFLGS) {
			case 0:
			case NS_TYPE_ELT:
				/* Limit checks */

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

				srcn = (n & 0x3F) * 256 | msg[srcn] & 0xFF;

				if (srcn < 0 || srcn >= eom) { /* Out of range */
					errno(EMSGSIZE);
					return -1;
				}

				checked += 2;
				/* check for loops in compressed name */
				if (checked >= eom) {
					errno(EMSGSIZE);
					return -1;
				}
				break;

			default:
				errno(EMSGSIZE);
				return -1; // flag error
		}
	}
	dst[dstn] = 0;
	if (dstlenp !== null)
		dstlenp.set(dstn);
	if (llen < 0)
		llen = srcn - offset;
	return llen;
}

/**
 * Pack domain name `domain` into `comp_dn`.
 *
 * Side effects: The list of pointers in dnptrs is updated for labels inserted
 * into the message as we compress the name. If `dnptr` is `NULL`, we don't try
 * to compress names. If `lastdnptr` is `NULL`, we don't update the list.
 * @param {Buffer} src
 * @param {number} srcn
 * @param {Buffer} dst
 * @param {number} dstn
 * @param {number} dstsiz
 * @param {Array<number>} dnptrs An array of pointers to previous compressed
 * names. dnptrs[0] is a pointer to the beginning of the message. The array ends
 * with `NULL`.
 * @param {number} lastdnptr a pointer to the end of the array pointed to by
 * `dnptrs`.
 * @return {number} Size of the compressed name, or -1.
 */
function ns_name_pack(src, srcn, dst, dstn, dstsiz, dnptrs, lastdnptr) {
	/** @type {number} */
	let dstp;
	/** @type {number} */
	let cpp;
	/** @type {number} */
	let lpp;
	/** @type {Buffer} */
	let msg;
	/** @type {number} */
	let srcp;
	let n, l, first = 1;

	srcp = srcn;
	dstp = dstn;
	const eob = dstp + dstsiz;
	lpp = cpp = null;
	let ndnptr = 0;
	if (dnptrs !== null) {
		msg = dst;
		if (dnptrs[ndnptr++] !== null) {
			for (cpp = 0; dnptrs[cpp] !== null; cpp++);
			// This evil body-less loop is as it appears in ns_name.c. -ZB
			lpp = cpp; // end of list to search
		}
	} else
		msg = null;

	// make sure the domain we are about to add is legal
	l = 0;
	do {
		let l0;

		n = src[srcp];
		if ((n & NS_CMPRSFLGS) === NS_CMPRSFLGS) {
			errno(EMSGSIZE);
			return -1;
		}
		if ((l0 = labellen(src, srcp)) < 0) {
			errno(EINVAL);
			return -1;
		}
		l += l0 + 1;
		if (l > NS_MAXCDNAME) {
			errno(EMSGSIZE);
			return -1;
		}
		srcp += l0 + 1;
	} while (n !== 0);

	// from here on we need to reset compression pointer array on error
	srcp = srcn;
	let cleanup = false; // instead of goto
	do {
		// look to see if we can use pointers
		n = src[srcp];
		if (n !== 0 && msg !== null) {
			l = dn_find(src, srcp, msg, dnptrs, ndnptr, lpp);
			if (l >= 0) {
				if (dstp + 1 >= eob) {
					cleanup = true;
					break;
				}
				dst[dstp++] = l >> 8 | NS_CMPRSFLGS;
				dst[dstp++] = l & 0xff;
				return dstp - dstn;
			}
			// Not found, save it.
			if (lastdnptr !== null && cpp < lastdnptr - 1 &&
				dstp < 0x4000 && first) {
				dnptrs[cpp++] = dstp;
				dnptrs[cpp++] = null;
				first = 0;
			}
		}
		// copy label to buffer
		if ((n & NS_CMPRSFLGS) === NS_CMPRSFLGS) {
			// should not happen
			cleanup = true;
			break;
		}
		n = labellen(src, srcp);
		if (dstp + 1 + n >= eob) {
			cleanup = true;
			break;
		}
		copy(src, dst, dstp, srcp, srcp + (n + 1));
		srcp += n + 1;
		dstp += n + 1;

	} while (n !== 0);

	if (dstp > eob ||
		// cleanup:
		cleanup) {
		if (msg !== null) {
			dnptrs[lpp] = null;
		}
		errno(EMSGSIZE);
		return -1;
	}
	return dstp - dstn;
}

/**
 * Expand compressed domain name to presentation format. Note: root domain
 * returns as "." not "".
 * @param {Buffer} msg
 * @param {number} offset
 * @param {number} len
 * @param {Buffer} dst
 * @param {number} dstsiz
 * @return {number} Number of bytes read out of `src`, or -1 (with errno set).
 */
function ns_name_uncompress(msg, offset, len, dst, dstsiz) {
	let n;
	const tmp = Buffer.alloc(NS_MAXCDNAME);
	if ((n = ns_name_unpack(msg, offset, len, tmp, tmp.length)) === -1) return -1;
	if (ns_name_ntop(tmp, dst, dstsiz) === -1) return -1;
	return n;
}

/**
 * Advance `ptrptr` to skip over the compressed name it points at.
 * @param {Buffer} b
 * @param {Ptr} ptrptr
 * @param {number} eom
 * @return {number} 0 on success, -1 (with errno set) on failure.
 */
function ns_name_skip(b, ptrptr, eom) {
	let cp;
	let n;
	let l;
	cp = ptrptr.get();
	while (cp < eom && (n = b[cp++]) !== 0) {
		switch (n & NS_CMPRSFLGS) {
			case 0: // normal case, n === len
				cp += n;
				continue;
			case NS_TYPE_ELT: // edns0 extended label
				if ((l = labellen(b, cp - 1)) < 0) {
					errno(EMSGSIZE);
					return -1;
				}
				cp += l;
				continue;
			case NS_CMPRSFLGS: // indirection
				cp++;
				break;
			default: // illegal type
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

/**
 * Find the number of octets an nname takes up, including the root label. (This
 * is basically ns_name_skip() without compression-pointer support.) (NOTE: can
 * only return zero if passed-in namesiz argument is zero.)
 * @param {Buffer} b
 * @param {number} nname
 * @param {number} namesiz
 * @return {number}
 */
function ns_name_length(b, nname, namesiz) {
	const orig = nname;
	let n;

	while (namesiz-- > 0 && (n = b[nname++]) !== 0) {
		if ((n & NS_CMPRSFLGS) !== 0) {
			return -1;
		}
		if (n > namesiz) {
			return -1;
		}
		nname += n;
		namesiz -= n;
	}
	return nname - orig;
}

function strncasecmp(buf1, s1, buf2, s2, n) {
	for (let i = 0; i < n; i++) {
		if ((buf1[s1 + i] | 0x20) !== (buf2[s2 + i] | 0x20)) {
			return -1;
		}
	}
	return 0;
}

/**
 * Compare two nnames for equality.
 * @param {Buffer} bufa
 * @param {number} a
 * @param {number} as
 * @param {Buffer} bufb
 * @param {number} b
 * @param {number} bs
 * @return {number} Return -1 on error (setting errno).
 */
function ns_name_eq(bufa, a, as, bufb, b, bs) {
	const ae = a + as, be = b + bs;
	let ac, bc;
	while (ac = bufa[a], bc = bufb[b], ac !== 0 && bc !== 0) {
		if ((ac & NS_CMPRSFLGS) !== 0 || (bc & NS_CMPRSFLGS) !== 0) {
			errno(EISDIR);
			return -1;
		}
		if (a + ac >= ae || b + bc >= be) {
			errno(EMSGSIZE);
			return -1;
		}
		if (ac !== bc || strncasecmp(bufa, ++a,
			bufb, ++b, ac) !== 0) {
			return 0;
		}
		a += ac, b += bc;
	}
	return Number(ac === 0 && bc === 0);
}

/**
 * Is domain "A" owned by (at or below) domain "B"?
 * @param {Buffer} bufa
 * @param {map_t} mapa
 * @param {number} an
 * @param {Buffer} bufb
 * @param {map_t} mapb
 * @param {number} bn
 * @return {number}
 */
function ns_name_owned(bufa, mapa, an, bufb, mapb, bn) {
	// If A is shorter, it cannot be owned by B.
	if (an < bn)
		return 0;

	// If they are unequal before the length of the shorter, A cannot...
	let a = 0, b = 0;
	while (bn > 0) {
		if (mapa[a].len !== mapa[b].len ||
			strncasecmp(bufa, mapa[a].base, bufb, mapb[b].base, mapa[a].len)) {
			return 0;
		}
		a++ , an--;
		b++ , bn--;
	}

	// A might be longer or not, but either way, B owns it.
	return 1;
}

/**
 * Build an array of <base, len> tuples from an nname, top-down order.
 * @param {Buffer} b
 * @param {number} nname
 * @param {number} namelen
 * @param {*} map `ns_namemap_t`
 * @param {number} mapsize
 * @return {number} the number of tuples (labels) thus discovered.
 */
function ns_name_map(b, nname, namelen, map, mapsize) {
	const n = b[nname++];
	namelen--;

	/* root zone? */
	if (n === 0) {
		/* extra data follows name? */
		if (namelen > 0) {
			errno(EMSGSIZE);
			return -1;
		}
		return 0;
	}
	/* compression pointer? */
	if ((n & NS_CMPRSFLGS) !== 0) {
		errno(EISDIR);
		return -1;
	}

	/* label too long? */
	if (n > namelen) {
		errno(EMSGSIZE);
		return -1;
	}

	/* recurse to get rest of name done first */
	const l = ns_name_map(b, nname + n, namelen - n, map, mapsize);
	if (l < 0) {
		return -1;
	}

	/* too many labels? */
	if (l >= mapsize) {
		errno(ENAMETOOLONG);
		return -1;
	}

	map.buf = b;
	/* we're on our way back up-stack, store current map data */
	/** @type {map_t} */
	const mapl = {
		base: nname,
		len: n
	};
	map[l] = mapl;
	return l + 1;
}

/**
 * Count the number of labels in a domain name. Root counts, so COM. has two.
 * This is to make the result comparable to the result of ns_name_map().
 * @param {*} b
 * @param {*} nname
 * @param {number} namesiz
 * @return {number}
 */
function ns_name_labels(b, nname, namesiz) {
	let ret = 0;
	let n;

	while (namesiz-- > 0 && (n = b[nname++]) !== 0) {
		if ((n & NS_CMPRSFLGS) !== 0) {
			errno(EISDIR);
			return -1;
		}
		if (n > namesiz) {
			errno(EMSGSIZE);
			return -1;
		}
		nname += n;
		namesiz -= n;
		ret++;
	}
	return ret + 1;
}

/**
 * Thinking in noninternationalized USASCII (per the DNS spec), is the character
 * special ("in need to quoting")?
 * @param {number} ch
 * @return {boolean}
 * @private
 */
function special(ch) {
	switch (ch) {
		case 0x22: /* """ */
		case 0x2E: /* "." */
		case 0x3B: /* ";" */
		case 0x5C: /* "\\" */
		case 0x28: /* "(" */
		case 0x29: /* ")" */
		case 0x40: /* "@" */ // special modifiers in the zone file
		case 0x24: /* "$" */ // special modifiers in the zone file
			return true;
		default:
			return false;
	}
}

/**
 * Thinking in noninternationalized USASCII (per the DNS spec), is this
 * character visible and not a space when printed ?
 * @param {number} ch
 * @private
 */
function printable(ch) {
	return ch > 0x20 && ch < 0x7F;
}

/**
 * Thinking in noninternationalized USASCII (per the DNS spec), conver this
 * character to lower case if it's upper case.
 * @param {number} ch
 * @return {number}
 * @private
 */
function mklower(ch) {
	if (ch >= 0x41 && ch <= 0x5A)
		return ch + 0x20;
	return ch;
}

/**
 * Search for the counted-label name in an array of compressed names (RFC1035
 * section 4.1.4).
 * @param {Buffer} src Buffer containing domain name to search for.
 * @param {number} domain Index of length-tagged domain name in `src` Buffer.
 * @param {Buffer} msg Contains domain names to search against.
 * @param {ReadonlyArray<number>} dnptrs Pointer to the first name on the list,
 * not the pointer to the start of the message.
 * @param {number} ndnptr Index of first pointer in dnptrs?
 * @param {number} lastdnptr Index of last pointer in dnptrs?
 * @return {number} offset into msg if found, or -1.
 * @private
 */
function dn_find(src, domain, msg, dnptrs, ndnptr, lastdnptr) {
	/** @type {number} */
	let dn;
	/** @type {number} */
	let cp;
	/** @type {number} */
	let sp;
	let cpp;
	let n;

	let next = false; // instead of goto
	for (cpp = ndnptr; cpp < lastdnptr; cpp++) {
		sp = dnptrs[cpp];
		// terminate search on:
		// root label
		// compression pointer
		// unusable offset
		while (msg[sp] !== 0 && (msg[sp] & NS_CMPRSFLGS) === 0 && sp < 0x4000) {
			dn = domain;
			cp = sp;
			while ((n = msg[cp++]) !== 0) {
				// check for indirection
				switch (n & NS_CMPRSFLGS) {
					case 0: // normal case, n === len
						n = labellen(msg, cp - 1); // XXX
						if (n !== src[dn++]) {
							next = true;
							break;
						}
						for (null; n > 0; n--) {
							if (mklower(src[dn++]) !== mklower(msg[cp++])) {
								next = true;
								break;
							}
						}
						if (next) {
							break;
						}
						// Is next root for both ?
						if (src[dn] === 0 && msg[cp] === 0) {
							return sp;
						}
						if (src[dn]) {
							continue;
						}
						next = true;
						break;
					case NS_CMPRSFLGS: // indirection
						cp = (n & 0x3f) << 8 | msg[cp];
						break;

					default: // illegal type
						errno(EMSGSIZE);
						return -1;
				}
				if (next) {
					break;
				}
			}
			sp += msg[sp] + 1;
			if (next) {
				next = false;
			}
		}
	}
	errno(ENOENT);
	return -1;
}

/**
 * @todo This diverges heavily from libbind-6.0
 * @param {*} b
 * @param {Ptr} cpp
 * @param {*} d
 * @param {*} dn
 * @param {number} eom
 * @return {number}
 * @private
 */
function decode_bitstring(b, cpp, d, dn, eom) {
	let cp = cpp.get();
	let blen, plen;

	if ((blen = b[cp] & 0xff) === 0)
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

/**
 * @param {*} src
 * @param {Ptr} bp
 * @param {*} end
 * @param {Ptr} labelp
 * @param {*} dst
 * @param {Ptr} dstp
 * @param {*} eom
 * @return {number}
 * @private
 */
function encode_bitstring(src, bp, end, labelp, dst, dstp, eom) {
	let afterslash = 0;
	let cp = bp.get();
	let tp;
	let c;
	let beg_blen;
	let end_blen = null;
	let value = 0, count = 0, tbcount = 0, blen = 0;

	beg_blen = end_blen = null;

	// a bitstring must contain at least two bytes
	if (end - cp < 2)
		return EINVAL;

	// currently, only hex strings are supported
	if (src[cp++] !== 120) // "x"
		return EINVAL;
	if (!isxdigit(src[cp] & 0xff)) // reject "\[x/BLEN]"
		return EINVAL;

	let done = false;
	for (tp = dstp.get() + 1; cp < end && tp < eom; cp++) {
		switch (c = src[cp++]) {
			case 93: // "]"
				if (afterslash) {
					if (beg_blen === null)
						return EINVAL;
					blen = strtol(src, beg_blen, 10);
					// TODO
					// if (*end_blen !== 93) // ']'
					//     return EINVAL;
				}
				if (count)
					dst[tp++] = value << 4 & 0xff;
				cp++; // skip "]"
				done = true;
				break;
			case 47: // "/"
				afterslash = 1;
				break;
			default:
				if (afterslash) {
					if (!isxdigit(c & 0xff))
						return EINVAL;
					if (beg_blen === null) {

						if (c === 48) { // '0'
							// blen never begins with 0
							return EINVAL;
						}
						beg_blen = cp;
					}
				} else {
					if (!isxdigit(c & 0xff))
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
	// done:
	if (cp >= end || tp >= eom)
		return EMSGSIZE;
	// bit length validation:
	// If a <length> is present, the number of digits in the <bit-data> MUST be
	// just sufficient to contain the number of bits specified by the <length>.
	// If there are insufficient bits in a final hexadecimal or octal digit,
	// they MUST be zero. RFC2673, Section 3.2
	if (blen && blen > 0) {
		if ((blen + 3 & ~3) !== tbcount)
			return EINVAL;
		const traillen = tbcount - blen; // between 0 and 3
		if ((value << 8 - traillen & 0xFF) !== 0)
			return EINVAL;
	} else
		blen = tbcount;
	if (blen === 256)
		blen = 0;

	// encode the type and the significant bit fields
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
	return ch >= 48 && ch <= 57
		|| ch >= 97 && ch <= 102
		|| ch >= 65 && ch <= 70;
}

/**
 * Convert string to integer.
 * @param {Buffer} b
 * @param {number} off Byte offset to start decoding at.
 * @param {number} base
 */
function strtol(b, off, base) {
	// todo: port from C
	return Number.parseInt(b.toString("ascii", off), base);
}

const _msg = new ns_msg();
const _rr = new ns_rr2();

export default class Message {
	constructor() {
		this.header = new MessageHeader();
		this.question = new Array();
		this.answer = new Array();
		this.authoritative = new Array();
		this.additional = new Array();
	}

	/**
	 * Adds an RR to the message.
	 * @param {number} sect An ns_sect value.
	 * @param {string} name
	 * @param {number} type An ns_type value.
	 * @param {number} klass An ns_class value.
	 * @param {number} ttl
	 * @param {Array<string>} info
	 */
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

	/**
	 * @param {Buffer} buf
	 */
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
					if (ns_rdata_unpack(buf, buf.length, _rr.type, _rr.rdata, _rr.rdlength, rr.rdata) === -1) return -1;
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
}
