import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_RECTANGLE extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 14 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_RECTANGLE;

    @serialize(LiteralType.uint16)
    public bottomRect: number = 0;

    @serialize(LiteralType.uint16)
    public rightRect: number = 0;

    @serialize(LiteralType.uint16)
    public topRect: number = 0;

    @serialize(LiteralType.uint16)
    public leftRect: number = 0;
}
