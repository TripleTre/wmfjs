import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";
import { ColorRef } from "../structs";

export class META_SETPIXEL extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 14 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETPIXEL;

    @serialize()
    public colorRef: ColorRef = new ColorRef();

    @serialize(LiteralType.int16)
    public y: number = 0;

    @serialize(LiteralType.int16)
    public x: number = 0;
}
