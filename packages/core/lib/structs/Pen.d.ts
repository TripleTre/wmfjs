import { Serializable } from "../Serializable";
import { PenStyle } from "../enums";
import { PointS } from "./PointS";
import { ColorRef } from "./ColorRef";
export declare class Pen extends Serializable {
    readonly byteSize: number;
    penStyle: PenStyle;
    width: PointS;
    colorRef: ColorRef;
}
