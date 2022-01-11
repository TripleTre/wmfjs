import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_EOF extends SerializableRecord {
    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 6;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_EOF;
}
