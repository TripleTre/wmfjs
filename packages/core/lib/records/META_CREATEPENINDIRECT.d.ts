import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { Pen } from "../structs/Pen";
export declare class META_CREATEPENINDIRECT extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    pen: Pen;
}
