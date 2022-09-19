import { Serializable } from "../Serializable";
import { PenStyle } from "../enums";
import { LiteralType, readonly, serialize } from "../decorators";
import { PointS } from "./PointS";
import { ColorRef } from "./ColorRef";

export class Pen extends Serializable {

    @readonly
    public get byteSize(): number {
        return 10;
    };

    @serialize(LiteralType.uint16)
    public penStyle: PenStyle = PenStyle.PS_NULL;

    @serialize()
    public width: PointS = new PointS();

    @serialize()
    public colorRef: ColorRef = new ColorRef();

    public equals(other: Pen): boolean {
        return (
            this.penStyle === other.penStyle &&
            this.width.x === other.width.x &&
            this.colorRef.equals(other.colorRef)
        );
    }
}
