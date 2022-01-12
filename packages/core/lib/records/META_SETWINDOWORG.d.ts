import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_SETWINDOWORG extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    y: number;
    x: number;
}
