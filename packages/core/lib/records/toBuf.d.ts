declare function int16_2(value: number[]): ArrayBuffer;
declare function uint16(value: number): ArrayBuffer;
declare function rgb(value: number): ArrayBuffer;
export declare const toBuf: {
    META_SETWINDOWEXT: typeof int16_2;
    META_SETWINDOWORG: typeof int16_2;
    META_SETMAPMODE: typeof uint16;
    META_SETBKMODE: typeof uint16;
    META_SETPOLYFILLMODE: typeof uint16;
    META_SETTEXTALIGN: typeof uint16;
    META_SETTEXTCOLOR: typeof rgb;
};
export {};
