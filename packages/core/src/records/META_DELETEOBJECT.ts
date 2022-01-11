import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_DELETEOBJECT extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 8;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_DELETEOBJECT;

    @serialize(LiteralType.uint16)
    public objectIndex: number = 0;
}
