import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";
import { ColorRef } from "../structs/ColorRef";

export class META_SETTEXTCOLOR extends SerializableRecord {
    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 10;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETTEXTCOLOR;

    @serialize()
    public colorRef: ColorRef = new ColorRef();
}
