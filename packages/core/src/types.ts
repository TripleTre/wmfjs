import { Rect } from "./structs";
import { MetafileType, MetafileVersion, PenStyle } from "./enums";

export interface Placeable {
    fn: "Placeable",
    boundingBox: Rect;
    inch: number;
    reserved: number;
    checksum: number;
}

export interface Header {
    fn: "Header",
    type: MetafileType;
    headerSize: number;
    version: MetafileVersion;
    size: number;
    numberOfObjects: number;
    maxRecord: number;
}
