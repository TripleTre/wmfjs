import { Serializable } from "../Serializable";
import { LiteralType, serialize } from "../decorators";

export class PointS extends Serializable {

    public readonly byteSize: number = 4;

    @serialize(LiteralType.int16)
    public x: number = 0;

    @serialize(LiteralType.int16)
    public y: number = 0;

}
