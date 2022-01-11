import { Serializable } from "../Serializable";
import { PenStyle } from "../enums";
import { LiteralType, serialize } from "../decorators";
import { PointS } from "./PointS";
import { ColorRef } from "./ColorRef";

export class Pen extends Serializable {

    public readonly byteSize: number = 8;

    @serialize(LiteralType.uint16)
    public penStyle: PenStyle = PenStyle.PS_NULL;

    @serialize()
    public width: PointS = new PointS();

    @serialize()
    public colorRef: ColorRef = new ColorRef();
}
