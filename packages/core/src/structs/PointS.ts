import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";

export class PointS extends Serializable {

    @readonly
    public get byteSize(): number {
        return 4;
    };

    @serialize(LiteralType.int16)
    public x: number = 0;

    @serialize(LiteralType.int16)
    public y: number = 0;

}
