import { SerializableEscape } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { MetafileEscapes } from "../enums";

export class SETMITERLIMIT extends SerializableEscape {

    @serialize(LiteralType.uint16)
    public escapeFunction: MetafileEscapes = MetafileEscapes.SETMITERLIMIT;

    @serialize(LiteralType.uint16)
    public get byteCount(): number {
        return this.escapeData.byteLength;
    }
    public set byteCount(v: number) {}

    @serialize()
    public get escapeData(): ArrayBuffer {
        const buf = new Int32Array(1);
        buf[0] = this.miterLimit;
        return buf.buffer;
    };
    public set escapeData(buf: ArrayBuffer) {
        const view = new DataView(buf);
        this.miterLimit = view.getUint32(0, true);
    }

    public miterLimit: number = 5;

    public get byteSize(): number {
        return 2 + 2 + this.escapeData.byteLength;
    }
}
