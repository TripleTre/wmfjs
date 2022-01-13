import { Serializable } from "../Serializable";
export declare class ScanLine extends Serializable {
    get byteSize(): number;
    left: number;
    right: number;
}
