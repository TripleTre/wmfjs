import { SerializableEscape } from "../Serializable";
import { MetafileEscapes } from "../enums";
export declare class SETMITERLIMIT extends SerializableEscape {
    escapeFunction: MetafileEscapes;
    get byteCount(): number;
    set byteCount(v: number);
    get escapeData(): ArrayBuffer;
    set escapeData(buf: ArrayBuffer);
    miterLimit: number;
    get byteSize(): number;
}
