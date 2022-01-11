import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { MixMode, RecordType } from "../enums";

export class META_SETBKMODE extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 10;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETBKMODE;

    @serialize(LiteralType.uint16)
    public BkMode: MixMode = MixMode.TRANSPARENT;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
