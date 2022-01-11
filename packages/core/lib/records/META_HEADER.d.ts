import { Serializable } from "../Serializable";
import { MetafileType, MetafileVersion } from "../enums";
export declare class META_HEADER extends Serializable {
    byteSize: number;
    type: MetafileType;
    headerSize: number;
    version: MetafileVersion;
    sizeLow: number;
    sizeHigh: number;
    numberOfObjects: number;
    maxRecord: number;
    numberOfMembers: number;
}
