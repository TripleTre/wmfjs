import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";
import { LogBrush } from "../structs/LogBrush";

export class META_CREATEBRUSHINDIRECT extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 14;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_CREATEBRUSHINDIRECT;

    @serialize()
    public logBrush: LogBrush = new LogBrush();
}
