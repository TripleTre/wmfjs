import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";
import { PolyPolygon } from "../structs/PolyPolygon";

export class META_POLYPOLYGON extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return (4 + 2 + this.polyPolygon.byteSize) / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_POLYPOLYGON;

    @serialize()
    public polyPolygon: PolyPolygon = new PolyPolygon();
}
