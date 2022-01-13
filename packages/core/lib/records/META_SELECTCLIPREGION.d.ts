import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_SELECTCLIPREGION extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    region: number;
}
