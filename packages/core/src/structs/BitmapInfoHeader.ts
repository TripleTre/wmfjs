import { Serializable } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { BitCount, Compression } from "../enums";

export class BitmapInfoHeader extends Serializable {
    get byteSize(): number {
        return 40;
    }

    @serialize(LiteralType.uint32)
    public headerSize: number = 0;

    @serialize(LiteralType.int32)
    public width: number = 0;

    @serialize(LiteralType.int32)
    public height: number = 0;

    @serialize(LiteralType.uint16)
    public readonly planes: number = 0x0001;

    @serialize(LiteralType.uint16)
    public bitCount: BitCount = BitCount.BI_BITCOUNT_0;

    @serialize(LiteralType.uint32)
    public compression: Compression = Compression.BI_PNG;

    @serialize(LiteralType.uint32)
    public imageSize: number = 0;

    @serialize(LiteralType.int32)
    public xPelsPerMeter: number = 0;

    @serialize(LiteralType.int32)
    public yPelsPerMeter: number = 0;

    @serialize(LiteralType.uint32)
    public colorUsed: number = 0;

    @serialize(LiteralType.uint32)
    public colorImportant: number = 0;
}
