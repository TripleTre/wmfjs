import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { LogBrush } from "../structs/LogBrush";
export declare class META_CREATEBRUSHINDIRECT extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    logBrush: LogBrush;
}
