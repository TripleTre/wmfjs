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

export interface Pen {
    style: PenStyle;
    width: PointS;
    color: number;
}

export interface LogBrush {
    style: BrushStyle;
    color: number;
    hatch: HatchStyle;
}