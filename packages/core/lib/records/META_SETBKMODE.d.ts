import { SerializableRecord } from "../Serializable";
import { MixMode, RecordType } from "../enums";
export declare class META_SETBKMODE extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    BkMode: MixMode;
    readonly reserved: number;
}
