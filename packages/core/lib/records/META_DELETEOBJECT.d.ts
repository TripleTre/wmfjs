import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_DELETEOBJECT extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    objectIndex: number;
}
