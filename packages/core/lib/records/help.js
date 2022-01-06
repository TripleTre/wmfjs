export function offsetOf(input, offset) {
    return function (buf, _offset) {
        _offset += offset;
        return input(buf, _offset);
    };
}
export function int16_2(buf, offset) {
    return [
        buf.getInt16(offset + 2, true),
        buf.getInt16(offset, true),
    ];
}
export function uint16(buf, offset) {
    return [
        buf.getUint16(offset, true),
    ];
}
export function int32(buf, offset) {
    return [
        buf.getInt32(offset, true),
    ];
}
export function rgb(buf, offset) {
    const r = buf.getUint8(offset);
    const g = buf.getUint8(offset + 1);
    const b = buf.getUint8(offset + 2);
    return [r * 0x10000 + g * 0x100 + b];
}
export function pointS(buf, offset) {
    return [{
            x: buf.getInt16(offset, true),
            y: buf.getInt16(offset + 2, true),
        }];
}
export function penObject(buf, offset) {
    const penStyle = buf.getUint16(offset, true);
    const point = pointS(buf, offset + 2);
    const color = rgb(buf, offset + 6);
    return [{
            objectType: "Pen",
            style: penStyle,
            width: point[0],
            color: color[0],
        }];
}
export function logBrush(buf, offset) {
    const style = buf.getUint16(offset, true);
    const color = rgb(buf, offset + 2);
    const hatch = buf.getUint16(offset + 6, true);
    return [{
            objectType: "Brush",
            style,
            color: color[0],
            hatch,
        }];
}
