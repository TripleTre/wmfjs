import { Serializable } from "../Serializable";
import { MetafileType, MetafileVersion } from "../enums";
export declare class META_HEADER extends Serializable {
    get byteSize(): number;
    type: MetafileType;
    readonly headerSize: number;
    version: MetafileVersion;
    size: number;
    numberOfObjects: number;
    maxRecord: number;
    readonly numberOfMembers: number;
}
