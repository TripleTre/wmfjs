import { BYTE_PER_WORD, Serializable } from "../Serializable";
import { MetafileType, MetafileVersion } from "../enums";
import { LiteralType, readonly, serialize } from "../decorators";

export class META_HEADER extends Serializable {

    @readonly
    public get byteSize(): number{
        return 18;
    };

    @serialize(LiteralType.uint16)
    public type: MetafileType = MetafileType.DISKMETAFILE;

    @serialize(LiteralType.uint16)
    public readonly headerSize: number = 18 / BYTE_PER_WORD;

    @serialize(LiteralType.uint16)
    public version: MetafileVersion = MetafileVersion.META_VERSION300;

    @serialize(LiteralType.uint32)
    public size: number = 0;

    @serialize(LiteralType.uint16)
    public numberOfObjects: number = 0;

    @serialize(LiteralType.uint32)
    public maxRecord: number = 0;

    @serialize(LiteralType.uint16)
    public readonly numberOfMembers: number = 0x0000;
}
