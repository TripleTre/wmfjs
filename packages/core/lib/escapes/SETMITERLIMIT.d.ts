import { SerializableEscape } from "../Serializable";
import { MetafileEscapes } from "../enums";
export declare class SETMITERLIMIT extends SerializableEscape {
    escapeFunction: MetafileEscapes;
    get byteCount(): number;
    get escapeData(): ArrayBuffer;
    set escapeData(buf: ArrayBuffer);
    miterLimit: number;
}
