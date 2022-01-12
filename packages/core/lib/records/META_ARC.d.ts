import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_ARC extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    yEndArc: number;
    xEndArc: number;
    yStartArc: number;
    xStartArc: number;
    bottomRect: number;
    rightRect: number;
    topRect: number;
    leftRect: number;
}
