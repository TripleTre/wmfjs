import { Serializable } from "../Serializable";
export declare class Rect extends Serializable {
    get byteSize(): number;
    left: number;
    top: number;
    right: number;
    bottom: number;
}
