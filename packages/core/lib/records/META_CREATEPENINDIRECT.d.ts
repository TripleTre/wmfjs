import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { Pen } from "../structs/Pen";
export declare class META_CREATEPENINDIRECT extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    pen: Pen;
}
