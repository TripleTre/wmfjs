import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { ColorRef } from "../structs";
export declare class META_FLOODFILL extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    colorRef: ColorRef;
    y: number;
    x: number;
}
