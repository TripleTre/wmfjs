import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_CHORD extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 22 / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_CHORD;

    @serialize(LiteralType.int16)
    public yRadial2: number = 0;

    @serialize(LiteralType.int16)
    public xRadial2: number = 0;

    @serialize(LiteralType.int16)
    public yRadial1: number = 0;

    @serialize(LiteralType.int16)
    public xRadial1: number = 0;

    @serialize(LiteralType.int16)
    public bottomRect: number = 0;

    @serialize(LiteralType.int16)
    public rightRect: number = 0;

    @serialize(LiteralType.int16)
    public topRect: number = 0;

    @serialize(LiteralType.int16)
    public leftRect: number = 0;
}
