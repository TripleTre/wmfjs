import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
export declare class META_CHORD extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    yRadial2: number;
    xRadial2: number;
    yRadial1: number;
    xRadial1: number;
    bottomRect: number;
    rightRect: number;
    topRect: number;
    leftRect: number;
}
