import { BYTE_PER_WORD, SerializableEscape, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { MetafileEscapes, RecordType } from "../enums";
import { SETMITERLIMIT } from "../escapes/SETMITERLIMIT";

export class META_ESCAPE extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return (4 + 2 + this.escape.byteSize) / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_ESCAPE;

    public escape: SerializableEscape = new SETMITERLIMIT();

}
