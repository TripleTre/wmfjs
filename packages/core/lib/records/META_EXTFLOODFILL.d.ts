import { SerializableRecord } from "../Serializable";
import { FloodFill, RecordType } from "../enums";
import { ColorRef } from "../structs";
export declare class META_EXTFLOODFILL extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    mode: FloodFill;
    colorRef: ColorRef;
    y: number;
    x: number;
}
