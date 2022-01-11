import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { PointS } from "../structs/PointS";
export declare class META_POLYGON extends SerializableRecord {
    get recordSize(): number;
    set recordSize(v: number);
    readonly recordFunction: RecordType;
    get numberOfPoints(): number;
    set numberOfPoints(v: number);
    aPoints: Array<PointS>;
}
