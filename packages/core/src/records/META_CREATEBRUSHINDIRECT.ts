import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";
import { LogBrush } from "../structs/LogBrush";

export class META_CREATEBRUSHINDIRECT extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 14 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_CREATEBRUSHINDIRECT;

    @serialize()
    public logBrush: LogBrush = new LogBrush();
}
