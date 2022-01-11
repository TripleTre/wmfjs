import { SerializableRecord } from "../Serializable";
import { PolyFillMode, RecordType } from "../enums";
export declare class META_SETPOLYFILLMODE extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    polyFillMode: PolyFillMode;
    readonly reserved: number;
}
