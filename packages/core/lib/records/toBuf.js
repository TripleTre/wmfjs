function int16_2(value) {
    const buf = new Int16Array(2);
    buf[0] = value[0];
    buf[1] = value[1];
    return buf.reverse().buffer;
}
function uint16(value) {
    const buf = new Uint16Array(1);
    buf[0] = value;
    return buf.reverse().buffer;
}
function rgb(value) {
    const buf = new Uint8Array(4);
    buf[2] = value - (value >> 8) * 0x100;
    buf[1] = (value - (value >> 16) * 0x10000 - buf[2]) >> 8;
    buf[0] = (value - buf[1] << 8 - buf[2]) >> 16;
    return buf.reverse().buffer;
}
export const toBuf = {
    META_SETWINDOWEXT: int16_2,
    META_SETWINDOWORG: int16_2,
    META_SETMAPMODE: uint16,
    META_SETBKMODE: uint16,
    META_SETPOLYFILLMODE: uint16,
    META_SETTEXTALIGN: uint16,
    META_SETTEXTCOLOR: rgb,
};
