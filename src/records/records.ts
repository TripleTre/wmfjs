import { int16_2, int32, logBrush, offsetOf, penObject, pointS, rgb, uint16 } from "./help";
import { PointS } from "../structs";

export const records = {
    META_SETWINDOWEXT: int16_2,
    META_SETWINDOWORG: int16_2,
    META_SETMAPMODE: uint16,
    META_SETBKMODE: uint16,
    META_SETPOLYFILLMODE: uint16,
    META_SETTEXTALIGN: uint16,
    META_SETTEXTCOLOR: rgb,
    META_SETROP2: uint16,
    META_CREATEPENINDIRECT: penObject,
    META_SELECTOBJECT: uint16,
    META_CREATEBRUSHINDIRECT: logBrush,
    META_DELETEOBJECT: uint16,
    SETMITERLIMIT: int32,
    META_EOF: () => [],
    META_ESCAPE(buf: DataView, offset: number): [number, number] {
        const fn = buf.getUint16(offset, true);
        // const byteCount = buf.getUint16(offset + 2, true);
        return [
            fn,
            offset + 4,
        ];
    },
    META_POLYGON(buf: DataView, offset: number): PointS[][] {
        const numberOfPoints = buf.getInt16(offset, true);
        const points = [];
        offset += 2;
        for (let i = 0; i < numberOfPoints; i ++) {
            points.push(pointS(buf, offset)[0]);
            offset += 4;
        }
        return [
            points
        ];
    },
};
