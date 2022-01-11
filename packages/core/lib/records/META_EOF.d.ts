import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_EOF extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
}
