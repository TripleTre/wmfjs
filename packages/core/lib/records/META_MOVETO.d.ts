import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_MOVETO extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    y: number;
    x: number;
}
