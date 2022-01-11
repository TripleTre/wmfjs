import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_SELECTOBJECT extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    objectIndex: number;
}
