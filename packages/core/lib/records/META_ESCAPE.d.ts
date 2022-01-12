import { SerializableEscape, SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_ESCAPE extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    escape: SerializableEscape;
}
