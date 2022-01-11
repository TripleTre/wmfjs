import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_SETTEXTALIGN extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    textAlignmentMode: number;
    readonly reserved: number;
}
