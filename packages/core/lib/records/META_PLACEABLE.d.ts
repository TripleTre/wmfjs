import { Rect } from "../structs/Rect";
import { Serializable } from "../Serializable";
export declare class META_PLACEABLE extends Serializable {
    byteSize: number;
    readonly key: number;
    readonly HWmf: number;
    boundingBox: Rect;
    inch: number;
    reserved: number;
    checksum: number;
}
