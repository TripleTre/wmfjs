import { LogBrush, Pen, PointS } from "../structs";
declare function int16_2(buf: DataView, offset: number): number[];
declare function uint16(buf: DataView, offset: number): number;
declare function int32(buf: DataView, offset: number): number;
declare function rgb(buf: DataView, offset: number): number;
declare function penObject(buf: DataView, offset: number): Pen;
declare function logBrush(buf: DataView, offset: number): LogBrush;
export declare const fromBuf: {
    META_SETWINDOWEXT: typeof int16_2;
    META_SETWINDOWORG: typeof int16_2;
    META_SETMAPMODE: typeof uint16;
    META_SETBKMODE: typeof uint16;
    META_SETPOLYFILLMODE: typeof uint16;
    META_SETTEXTALIGN: typeof uint16;
    META_SETTEXTCOLOR: typeof rgb;
    META_SETROP2: typeof uint16;
    META_CREATEPENINDIRECT: typeof penObject;
    META_SELECTOBJECT: typeof uint16;
    META_CREATEBRUSHINDIRECT: typeof logBrush;
    META_DELETEOBJECT: typeof uint16;
    SETMITERLIMIT: typeof int32;
    META_SETBKCOLOR: typeof rgb;
    META_EOF: () => never[];
    META_ESCAPE(buf: DataView, offset: number): [number, number];
    META_POLYGON(buf: DataView, offset: number): PointS[];
};
export {};
