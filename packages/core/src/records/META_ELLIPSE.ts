import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_ELLIPSE extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 14 / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_ELLIPSE;

    @serialize(LiteralType.int16)
    public bottomRect: number = 0;

    @serialize(LiteralType.int16)
    public rightRect: number = 0;

    @serialize(LiteralType.int16)
    public topRect: number = 0;

    @serialize(LiteralType.int16)
    public leftRect: number = 0;
}
