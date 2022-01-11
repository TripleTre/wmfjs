import { Serializable } from "../Serializable";
import { MetafileType, MetafileVersion } from "../enums";
import { LiteralType, serialize } from "../decorators";

export class META_HEADER extends Serializable {

    public byteSize: number = 18;

    @serialize(LiteralType.uint16)
    public type: MetafileType = MetafileType.DISKMETAFILE;

    @serialize(LiteralType.uint16)
    public headerSize: number = 18;

    @serialize(LiteralType.uint16)
    public version: MetafileVersion = MetafileVersion.META_VERSION300;

    @serialize(LiteralType.uint16)
    public sizeLow: number = 0;

    @serialize(LiteralType.uint16)
    public sizeHigh: number = 0;

    @serialize(LiteralType.uint16)
    public numberOfObjects: number = 0;

    @serialize(LiteralType.uint32)
    public maxRecord: number = 0;

    @serialize(LiteralType.uint16)
    public numberOfMembers: number = 0x0000;
}
