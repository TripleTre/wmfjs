import { Serializable } from "../Serializable";
import { BrushStyle, HatchStyle } from "../enums";
import { LiteralType, readonly, serialize } from "../decorators";
import { ColorRef } from "./ColorRef";

export class LogBrush extends Serializable {

    @readonly
    public get byteSize(): number {
        return 8;
    };

    @serialize(LiteralType.uint16)
    public brushStyle: BrushStyle = BrushStyle.BS_NULL;

    @serialize()
    public colorRef: ColorRef = new ColorRef();

    @serialize(LiteralType.uint16)
    public brushHatch: HatchStyle = HatchStyle.HS_HORIZONTAL;
}
