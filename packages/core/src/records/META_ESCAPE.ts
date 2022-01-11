import { SerializableEscape, SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { MetafileEscapes, RecordType } from "../enums";
import { SETMITERLIMIT } from "../escapes/SETMITERLIMIT";

export class META_ESCAPE extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 0;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_ESCAPE;

    public escape: SerializableEscape = new SETMITERLIMIT();

}
