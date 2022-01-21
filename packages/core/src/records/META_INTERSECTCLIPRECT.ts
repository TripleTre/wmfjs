import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_INTERSECTCLIPRECT extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 14 / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_INTERSECTCLIPRECT;

    @serialize(LiteralType.int16)
    public bottom: number = 0;

    @serialize(LiteralType.int16)
    public right: number = 0;

    @serialize(LiteralType.int16)
    public top: number = 0;

    @serialize(LiteralType.int16)
    public left: number = 0;
}
