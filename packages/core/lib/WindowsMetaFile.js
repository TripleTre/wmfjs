"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowsMetaFile = void 0;
const RECORDS = __importStar(require("./records"));
const records_1 = require("./records");
const Serializable_1 = require("./Serializable");
const enums_1 = require("./enums");
const BasicPlayback_1 = require("./BasicPlayback");
const ESCAPES = __importStar(require("./escapes"));
const CREATE_RECORD = [
    enums_1.RecordType.META_CREATEPENINDIRECT,
    enums_1.RecordType.META_CREATEBRUSHINDIRECT,
];
class WindowsMetaFile {
    constructor() {
        this.records = [];
        this.header = new records_1.META_HEADER();
    }
    deserialize(input) {
        let offset = 0;
        const buf = new DataView(input);
        const placeableFlag = buf.getUint32(offset, true);
        let placeable = undefined;
        if (placeableFlag === 0x9AC6CDD7) {
            placeable = new RECORDS.META_PLACEABLE();
            placeable.deserialize(input.slice(offset, placeable.byteSize));
            offset += placeable.byteSize;
            this.placeable = placeable;
        }
        const header = new RECORDS.META_HEADER();
        header.deserialize(input.slice(offset, offset + header.byteSize));
        offset += header.byteSize;
        this.header = header;
        while (offset < input.byteLength) {
            const size = buf.getUint32(offset, true) * 2;
            const fn = buf.getUint16(offset + 4, true);
            const recordType = enums_1.RecordType[fn];
            if (!RECORDS[recordType]) {
                console.warn("unsupported record payload", enums_1.RecordType[fn]);
                offset += size;
                continue;
            }
            const record = new RECORDS[enums_1.RecordType[fn]];
            record.deserialize(input.slice(offset, offset + size));
            if ((0, BasicPlayback_1.isEscape)(record)) {
                const escapeFunction = buf.getUint16(offset + 6, true);
                const escapeConstructor = ESCAPES[enums_1.MetafileEscapes[escapeFunction]];
                const byteCount = buf.getUint16(offset + 8, true);
                if (escapeConstructor) {
                    const escape = new escapeConstructor();
                    escape.deserialize(input.slice(offset + 6, offset + 10 + byteCount));
                    record.escape = escape;
                }
                else {
                    console.warn("unsupported escape ", enums_1.MetafileEscapes[escapeFunction]);
                }
            }
            offset += size;
            this.records.push(record);
        }
    }
    serialize() {
        this.header.numberOfObjects = 0;
        this.header.maxRecord = 0;
        let objectCount = 0;
        let byteSize = this.header.byteSize;
        if (this.placeable) {
            byteSize += this.placeable.byteSize;
        }
        for (const record of this.records) {
            this.header.maxRecord = Math.max(this.header.maxRecord, record.byteSize / Serializable_1.BYTE_PER_WORD);
            byteSize += record.byteSize;
            if (CREATE_RECORD.indexOf(record.recordFunction) >= 0) {
                objectCount += 1;
                if (this.header.numberOfObjects < objectCount) {
                    this.header.numberOfObjects = objectCount;
                }
            }
            else if (record.recordFunction === enums_1.RecordType.META_DELETEOBJECT) {
                objectCount -= 1;
            }
        }
        let offset = 0;
        this.header.size = byteSize / Serializable_1.BYTE_PER_WORD;
        const buf = new Uint8Array(byteSize);
        if (this.placeable) {
            const arrayBuf = this.placeable.serialize();
            const checkBuf = new DataView(arrayBuf);
            let checkSum = 0;
            for (let i = 0, len = arrayBuf.byteLength / 2; i < len - 1; i++) {
                checkSum = checkBuf.getUint16(i * 2, true) ^ checkSum;
            }
            this.placeable.checksum = checkSum;
            const placeableBuf = new Uint8Array(this.placeable.serialize());
            buf.set(placeableBuf, offset);
            offset += placeableBuf.byteLength;
        }
        const headerBuf = new Uint8Array(this.header.serialize());
        buf.set(headerBuf, offset);
        offset += headerBuf.byteLength;
        for (const record of this.records) {
            const recordBuf = new Uint8Array(record.serialize());
            buf.set(recordBuf, offset);
            offset += recordBuf.byteLength;
        }
        return buf.buffer;
    }
}
exports.WindowsMetaFile = WindowsMetaFile;
