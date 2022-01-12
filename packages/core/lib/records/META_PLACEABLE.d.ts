import { Rect } from "../structs/Rect";
import { Serializable } from "../Serializable";
export declare class META_PLACEABLE extends Serializable {
    get byteSize(): number;
    readonly key: number;
    readonly HWmf: number;
    boundingBox: Rect;
    inch: number;
    readonly reserved: number;
    checksum: number;
}
