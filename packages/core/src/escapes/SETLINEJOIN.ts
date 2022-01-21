import { SerializableEscape } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { MetafileEscapes } from "../enums";

export class SETLINEJOIN extends SerializableEscape {

    @serialize(LiteralType.uint16)
    public escapeFunction: MetafileEscapes = MetafileEscapes.SETLINEJOIN;

    @readonly
    @serialize(LiteralType.uint16)
    public get byteCount(): number {
        return this.escapeData.byteLength;
    };

    @serialize()
    public get escapeData(): ArrayBuffer {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        view.setInt32(0, this.join, true);
        return buf;
    };
    public set escapeData(buf: ArrayBuffer) {
        const view = new DataView(buf);
        this.join = view.getUint32(0, true);
    };

    public join: number = 4;
}
