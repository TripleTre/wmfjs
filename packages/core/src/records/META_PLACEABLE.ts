import { Rect } from "../structs/Rect";
import { LiteralType, readonly, serialize } from "../decorators";
import { Serializable } from "../Serializable";

export class META_PLACEABLE extends Serializable {

    @readonly
    public get byteSize(): number {
        return 22;
    };

    @serialize(LiteralType.uint32)
    public readonly key: number = 0x9AC6CDD7;

    @serialize(LiteralType.int16)
    public readonly HWmf: number = 0x0000;

    @serialize()
    public boundingBox: Rect = new Rect();

    @serialize(LiteralType.uint16)
    public inch: number = 1200;

    @serialize(LiteralType.uint32)
    public readonly reserved: number = 0x00000000;

    @serialize(LiteralType.int16)
    public checksum: number = 0;
}
