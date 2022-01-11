import { LiteralType, serialize } from "../decorators";
import { Serializable } from "../Serializable";

export class Rect extends Serializable {

    public readonly byteSize: number = 8;

    @serialize(LiteralType.int16)
    public left: number = 0;

    @serialize(LiteralType.int16)
    public top: number = 0;

    @serialize(LiteralType.int16)
    public right: number = 0;

    @serialize(LiteralType.int16)
    public bottom: number = 0;
}
