import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { FloodFill, RecordType } from "../enums";
import { ColorRef } from "../structs";

export class META_EXTFLOODFILL extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 16 / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_EXTFLOODFILL;

    @serialize(LiteralType.uint16)
    public mode: FloodFill = FloodFill.FLOODFILLBORDER;

    @serialize()
    public colorRef: ColorRef = new ColorRef();

    @serialize(LiteralType.int16)
    public y: number = 0;

    @serialize(LiteralType.int16)
    public x: number = 0;
}
