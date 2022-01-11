function int16_2(buf, offset) {
    return [
        buf.getInt16(offset + 2, true),
        buf.getInt16(offset, true),
    ];
}
function uint16(buf, offset) {
    return buf.getUint16(offset, true);
}
function int32(buf, offset) {
    return buf.getInt32(offset, true);
}
function rgb(buf, offset) {
    const r = buf.getUint8(offset);
    const g = buf.getUint8(offset + 1);
    const b = buf.getUint8(offset + 2);
    return r * 0x10000 + g * 0x100 + b;
}
function pointS(buf, offset) {
    return {
        x: buf.getInt16(offset, true),
        y: buf.getInt16(offset + 2, true),
    };
}
function penObject(buf, offset) {
    const penStyle = buf.getUint16(offset, true);
    const point = pointS(buf, offset + 2);
    const color = rgb(buf, offset + 6);
    return {
        objectType: "Pen",
        style: penStyle,
        width: point,
        color,
    };
}
function logBrush(buf, offset) {
    const style = buf.getUint16(offset, true);
    const color = rgb(buf, offset + 2);
    const hatch = buf.getUint16(offset + 6, true);
    return {
        objectType: "Brush",
        style,
        color,
        hatch,
    };
}
export const fromBuf = {
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
    META_SETBKCOLOR: rgb,
    META_EOF: () => [],
    META_ESCAPE(buf, offset) {
        const fn = buf.getUint16(offset, true);
        return [
            fn,
            offset + 4,
        ];
    },
    META_POLYGON(buf, offset) {
        const numberOfPoints = buf.getInt16(offset, true);
        const points = [];
        offset += 2;
        for (let i = 0; i < numberOfPoints; i++) {
            points.push(pointS(buf, offset));
            offset += 4;
        }
        return points;
    },
};
