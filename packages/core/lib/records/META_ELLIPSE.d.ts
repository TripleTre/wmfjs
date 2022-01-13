import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_ELLIPSE extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    bottomRect: number;
    rightRect: number;
    topRect: number;
    leftRect: number;
}
