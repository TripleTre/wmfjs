import { Serializable } from "../Serializable";
export declare class ColorRef extends Serializable {
    readonly byteSize: number;
    r: number;
    g: number;
    b: number;
    reserved: number;
    valueOf(): number;
}
