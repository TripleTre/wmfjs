import { MetafileEscapes, RecordType } from "./enums";
import { RECORDS } from "./records";
import * as ESCAPES from "./escapes";
import { WMF } from "./WMF";
import { isEscape } from "./BasicPlayback";

export function parser(input: ArrayBuffer): WMF {
    let offset = 0;

    const buf = new DataView(input);
    const placeableFlag = buf.getUint32(offset, true);
    let placeable = undefined;
    if (placeableFlag === 0x9AC6CDD7) {
        placeable = new RECORDS.META_PLACEABLE();
        placeable.deserialize(input.slice(offset, placeable.byteSize));
        offset += placeable.byteSize;
    }
    const header = new RECORDS.META_HEADER();
    header.deserialize(input.slice(offset, offset + header.byteSize));
    offset += header.byteSize;
    const wmf = new WMF(header, placeable);

    while (offset < input.byteLength) {
        const size = buf.getUint32(offset, true) * 2;
        const fn = buf.getUint16(offset + 4, true);
        const recordType = RecordType[ fn ];
        if (!(RECORDS as any)[ recordType ]) {
            console.warn("unsupported record payload", RecordType[ fn ]);
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
            } else {
                console.warn("unsupported escape ", MetafileEscapes[escapeFunction]);
            }
        }
        offset += size;
        wmf.records.push(record);
    }

    return wmf;
}
