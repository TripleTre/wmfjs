import { Serializable } from "../Serializable";
import { BrushStyle, HatchStyle } from "../enums";
import { ColorRef } from "./ColorRef";
export declare class LogBrush extends Serializable {
    get byteSize(): number;
    brushStyle: BrushStyle;
    colorRef: ColorRef;
    brushHatch: HatchStyle;
}
