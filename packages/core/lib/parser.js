import { MetafileEscapes, RecordType } from "./enums";
import { records } from "./records/records";
export function parser(input) {
    let offset = 0;
    const recordList = [];
    const buf = new DataView(input);
    const placeableFlag = buf.getUint32(offset, true);
    let placeable = null;
    // placeable header record
    if (placeableFlag === 0x9ac6cdd7) {
        placeable = {
            boundingBox: {
                left: buf.getInt16(offset + 6, true),
                top: buf.getInt16(offset + 8, true),
                right: buf.getInt16(offset + 10, true),
                bottom: buf.getInt16(offset + 12, true),
            },
            inch: buf.getUint16(offset + 14, true),
            reserved: buf.getUint32(offset + 16, true),
            checksum: buf.getInt16(offset + 20, true),
        };
        offset += 22;
    }
    const header = {
        type: buf.getUint16(offset, true),
        headerSize: buf.getUint16(offset + 2, true) * 2,
        version: buf.getUint16(offset + 4, true),
        size: buf.getUint32(offset + 6, true) * 2,
        numberOfObjects: buf.getUint16(offset + 10, true),
        maxRecord: buf.getUint32(offset + 12, true),
    };
    offset += header.headerSize;
    while (offset < input.byteLength) {
        const size = buf.getUint32(offset, true) * 2;
        const fn = buf.getUint16(offset + 4, true);
        if (!records[RecordType[fn]]) {
            console.warn("unsupported record payload", RecordType[fn]);
            offset += size;
            continue;
        }
        if (fn === RecordType.META_ESCAPE) {
            const [escapeType, escapeDataOffset] = records[RecordType[fn]](buf, offset + 6);
            if (!records[MetafileEscapes[escapeType]]) {
                console.warn("unsupported escape payload", MetafileEscapes[escapeType]);
                offset += size;
                continue;
            }
            const escapePayload = records[MetafileEscapes[escapeType]](buf, escapeDataOffset);
            recordList.push({
                fn: RecordType[fn],
                payload: {
                    escapeFn: MetafileEscapes[escapeType],
                    escapePayload,
                },
                offset,
            });
        }
        else {
            const payload = records[RecordType[fn]](buf, offset + 6);
            recordList.push({
                fn: RecordType[fn],
                payload,
                offset,
            });
        }
        offset += size;
    }
    return {
        placeable,
        header,
        records: recordList,
    };
}
