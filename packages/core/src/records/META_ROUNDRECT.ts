import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_ROUNDRECT extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 18 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_ROUNDRECT;

    @serialize(LiteralType.int16)
    public height: number = 0;

    @serialize(LiteralType.int16)
    public width: number = 0;

    @serialize(LiteralType.int16)
    public bottomRect: number = 0;

    @serialize(LiteralType.int16)
    public rightRect: number = 0;

    @serialize(LiteralType.int16)
    public topRect: number = 0;

    @serialize(LiteralType.int16)
    public leftRect: number = 0;
}
