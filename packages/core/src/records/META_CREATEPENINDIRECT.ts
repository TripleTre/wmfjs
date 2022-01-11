import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";
import { Pen } from "../structs/Pen";

export class META_CREATEPENINDIRECT extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 16;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_CREATEPENINDIRECT;

    @serialize()
    public pen: Pen = new Pen();
}
