import { Serializable } from "../Serializable";
import { ScanLine } from "./ScanLine";
export declare class Scan extends Serializable {
    get byteSize(): number;
    get count(): number;
    top: number;
    bottom: number;
    scanLines: ScanLine[];
    get count2(): number;
}
