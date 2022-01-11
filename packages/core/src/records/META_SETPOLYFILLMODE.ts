import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { PolyFillMode, RecordType } from "../enums";

export class META_SETPOLYFILLMODE extends SerializableRecord {
    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 10;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETPOLYFILLMODE;

    @serialize(LiteralType.uint16)
    public polyFillMode: PolyFillMode = PolyFillMode.WINDING;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
