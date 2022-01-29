import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";
import { Font } from "../structs/Font";

export class META_CREATEFONTINDIRECT extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 56 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_CREATEFONTINDIRECT;

    @serialize()
    public font: Font = new Font();
}
