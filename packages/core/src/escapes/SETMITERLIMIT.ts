import { SerializableEscape } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { MetafileEscapes, PostScriptJoin } from "../enums";

export class SETMITERLIMIT extends SerializableEscape {

    @serialize(LiteralType.uint16)
    public escapeFunction: MetafileEscapes = MetafileEscapes.SETMITERLIMIT;

    @readonly
    @serialize(LiteralType.uint16)
    public get byteCount(): number {
        return this.escapeData.byteLength;
    }

    @serialize({ type: "ArrayBuffer", byteLength: 4 })
    public get escapeData(): ArrayBuffer {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        view.setInt32(0, this.miterLimit, true);
        return buf;
    };
    public set escapeData(buf: ArrayBuffer) {
        const view = new DataView(buf);
        this.miterLimit = view.getUint32(0, true);
    };

    public miterLimit: number = PostScriptJoin.PostScriptRoundJoin;

}
