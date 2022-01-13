import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";

export class ScanLine extends Serializable {

    @readonly
    public get byteSize(): number {
        return 4;
    };

    @serialize(LiteralType.uint16)
    public left: number = 0;

    @serialize(LiteralType.uint16)
    public right: number = 0;
}
