import { Serializable } from "../Serializable";
import { BrushStyle, HatchStyle } from "../enums";
import { LiteralType, serialize } from "../decorators";
import { ColorRef } from "./ColorRef";

export class LogBrush extends Serializable {

    public readonly byteSize: number = 8;

    @serialize(LiteralType.uint16)
    public brushStyle: BrushStyle = BrushStyle.BS_NULL;

    @serialize()
    public colorRef: ColorRef = new ColorRef();

    @serialize(LiteralType.uint16)
    public brushHatch: HatchStyle = HatchStyle.HS_HORIZONTAL;
}
