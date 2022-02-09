import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { BitCount } from "../enums";

export class BitmapCoreHeader extends Serializable {

    @readonly
    get byteSize(): number {
        return 12;
    }

    @serialize(LiteralType.uint32)
    public headerSize: number = 0;

    @serialize(LiteralType.uint16)
    public width: number = 0;

    @serialize(LiteralType.uint16)
    public height: number = 0;

    @serialize(LiteralType.uint16)
    public readonly planes: number = 0x0001;

    @serialize(LiteralType.uint16)
    public bitCount: BitCount = BitCount.BI_BITCOUNT_0;
}
