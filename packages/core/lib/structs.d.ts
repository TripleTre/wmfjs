import { BrushStyle, HatchStyle, PenStyle } from "./enums";
export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export interface PointS {
    x: number;
    y: number;
}
export declare type WMFObject = Pen | LogBrush;
export interface Pen {
    objectType: "Pen";
    style: PenStyle;
    width: PointS;
    color: number;
}
export interface LogBrush {
    objectType: "Brush";
    style: BrushStyle;
    color: number;
    hatch: HatchStyle;
}
