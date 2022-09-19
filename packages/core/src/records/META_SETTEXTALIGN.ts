import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_SETTEXTALIGN extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 10 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETTEXTALIGN;

    @serialize(LiteralType.uint16)
    public textAlignmentMode: number = 0x0000;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
