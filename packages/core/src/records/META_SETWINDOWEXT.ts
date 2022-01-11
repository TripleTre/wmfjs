import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_SETWINDOWEXT extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 10;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETWINDOWEXT;

    @serialize(LiteralType.int16)
    public y: number = 150;

    @serialize(LiteralType.int16)
    public x: number = 150;
}
