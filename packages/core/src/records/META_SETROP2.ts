import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { BinaryRasterOperation, RecordType } from "../enums";

export class META_SETROP2 extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 10;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETROP2;

    @serialize(LiteralType.uint16)
    public drawMode: BinaryRasterOperation = BinaryRasterOperation.R2_COPYPEN;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
