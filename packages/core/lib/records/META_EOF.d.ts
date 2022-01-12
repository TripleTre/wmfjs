import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_EOF extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
}
