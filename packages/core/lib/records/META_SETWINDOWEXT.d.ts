import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_SETWINDOWEXT extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    y: number;
    x: number;
}
