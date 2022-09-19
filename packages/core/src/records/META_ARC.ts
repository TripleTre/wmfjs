import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { LiteralType, readonly, serialize } from "../decorators";

export class META_ARC extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 22 / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_ARC;

    @serialize(LiteralType.int16)
    public yEndArc: number = 0;

    @serialize(LiteralType.int16)
    public xEndArc: number = 0;

    @serialize(LiteralType.int16)
    public yStartArc: number = 0;

    @serialize(LiteralType.int16)
    public xStartArc: number = 0;

    @serialize(LiteralType.int16)
    public bottomRect: number = 0;

    @serialize(LiteralType.int16)
    public rightRect: number = 0;

    @serialize(LiteralType.int16)
    public topRect: number = 0;

    @serialize(LiteralType.int16)
    public leftRect: number = 0;
}
