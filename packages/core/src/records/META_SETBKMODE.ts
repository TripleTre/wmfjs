import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { MixMode, RecordType } from "../enums";

export class META_SETBKMODE extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 10 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETBKMODE;

    @serialize(LiteralType.uint16)
    public BkMode: MixMode = MixMode.TRANSPARENT;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
