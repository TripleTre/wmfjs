import { SerializableRecord } from "../Serializable";
import { BinaryRasterOperation, RecordType } from "../enums";
export declare class META_SETROP2 extends SerializableRecord {
    readonly recordSize: number;
    readonly recordFunction: RecordType;
    drawMode: BinaryRasterOperation;
    readonly reserved: number;
}
