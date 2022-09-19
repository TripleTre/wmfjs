import * as RECORDS from "./records";
import { META_HEADER, META_PLACEABLE } from "./records";
import { BYTE_PER_WORD, SerializableRecord } from "./Serializable";
import { MetafileEscapes, RecordType } from "./enums";
import { isEscape } from "./BasicPlayback";
import * as ESCAPES from "./escapes";

const CREATE_RECORD = [
    RecordType.META_CREATEPENINDIRECT,
    RecordType.META_CREATEBRUSHINDIRECT,
];

export class WindowsMetaFile {

    public placeable?: META_PLACEABLE;
    public header: META_HEADER;

    public records: SerializableRecord[] = [];

    public constructor() {
        this.header = new META_HEADER();
    }

    public deserialize(input: ArrayBuffer): void {
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
            const recordType = RecordType[ fn ];
            if (!(RECORDS as any)[ recordType ]) {
                console.warn("unsupported record", RecordType[ fn ]);
                offset += size;
                continue;
            }
            const record = new (RECORDS as any)[ RecordType[ fn ] ];
            record.deserialize(input.slice(offset, offset + size));
            if (isEscape(record)) {
                const escapeFunction = buf.getUint16(offset + 6, true);
                const escapeConstructor = (ESCAPES as any)[MetafileEscapes[escapeFunction]];
                const byteCount = buf.getUint16(offset + 8, true);
                if (escapeConstructor) {
                    const escape = new escapeConstructor();
                    escape.deserialize(input.slice(offset + 6, offset + 10 + byteCount));
                    record.escape = escape;
                } else {
                    console.warn("unsupported escape ", MetafileEscapes[escapeFunction]);
                }
            }
            offset += size;
            this.records.push(record);
        }
    }

    public serialize(): ArrayBuffer {
        this.header.numberOfObjects = 0;
        this.header.maxRecord = 0;

        let objectCount = 0;
        let byteSize = this.header.byteSize;
        if (this.placeable) {
            byteSize += this.placeable.byteSize;
        }
        for (const record of this.records) {
            this.header.maxRecord = Math.max(this.header.maxRecord, record.byteSize / BYTE_PER_WORD);
            byteSize += record.byteSize;
            if (CREATE_RECORD.indexOf(record.recordFunction) >= 0) {
                objectCount += 1;
                if (this.header.numberOfObjects < objectCount) {
                    this.header.numberOfObjects = objectCount;
                }
            } else if (record.recordFunction === RecordType.META_DELETEOBJECT) {
                objectCount -= 1;
            }
        }
        let offset = 0;

        this.header.size = byteSize / BYTE_PER_WORD;

        const buf = new Uint8Array(byteSize);

        if (this.placeable) {
            const arrayBuf = this.placeable.serialize();
            const checkBuf = new DataView(arrayBuf);
            let checkSum = 0;
            for (let i = 0, len = arrayBuf.byteLength / 2; i < len - 1; i ++) {
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