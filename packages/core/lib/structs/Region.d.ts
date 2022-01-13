import { Serializable } from "../Serializable";
import { Scan } from "./Scan";
export declare class Region extends Serializable {
    get byteSize(): number;
    nextInChain: number;
    objectType: number;
    objectCount: number;
    get regionSize(): number;
    get scanCount(): number;
    set scanCount(v: number);
    get maxScan(): number;
    aScans: Scan[];
}
