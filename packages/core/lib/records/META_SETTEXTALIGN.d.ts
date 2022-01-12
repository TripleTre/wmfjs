import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_SETTEXTALIGN extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    textAlignmentMode: number;
    readonly reserved: number;
}
