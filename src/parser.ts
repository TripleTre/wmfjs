import { Header, Placeable } from "./types";
import { MetafileEscapes, RecordType } from "./enums";
import { IPlayback } from "./IPlayback";
import { records } from "./records/records";

export function parser(input: ArrayBuffer, playback: IPlayback): void {
    let offset = 0;
    const buf = new DataView(input);
    const placeableFlag = buf.getUint32(offset, true);

    let placeable: Placeable | null = null;
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
    const header: Header = {
        type: buf.getUint16(offset, true),
        headerSize: buf.getUint16(offset + 2, true) * 2,
        version: buf.getUint16(offset + 4, true),
        size: buf.getUint32(offset + 6, true) * 2,
        numberOfObjects: buf.getUint16(offset + 10, true),
        maxRecord: buf.getUint32(offset + 12, true),
    }
    offset += header.headerSize;

    console.log(header, placeable);

    while (offset < input.byteLength) {
        const size = buf.getUint32(offset, true) * 2;
        const fn = buf.getUint16(offset + 4, true);
        if (typeof (playback as any)[RecordType[fn]] === "function") {
            if (fn === RecordType.META_ESCAPE) {
                const [escapeType, escapeDataOffset] = (records as any)[RecordType[fn]](buf, offset + 6);
                if (typeof (playback as any)[MetafileEscapes[escapeType]] === "function") {
                    (playback as any)[MetafileEscapes[escapeType]].apply(playback, (records as any)[MetafileEscapes[escapeType]](buf, escapeDataOffset));
                } else {
                    console.warn("unsupport fn ", MetafileEscapes[escapeType]);
                }
            } else {
                (playback as any)[RecordType[fn]].apply(playback, (records as any)[RecordType[fn]](buf, offset + 6));
            }
        } else {
            console.warn("unsupport fn ", RecordType[fn]);
        }
        offset += size;
    }

}
