import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_SETTEXTALIGN extends SerializableRecord {
    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 10;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETTEXTALIGN;

    @serialize(LiteralType.uint16)
    public textAlignmentMode: number = 0x0000;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
