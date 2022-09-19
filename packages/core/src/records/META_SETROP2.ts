import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { BinaryRasterOperation, RecordType } from "../enums";

export class META_SETROP2 extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 10 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETROP2;

    @serialize(LiteralType.uint16)
    public drawMode: BinaryRasterOperation = BinaryRasterOperation.R2_COPYPEN;

    @serialize(LiteralType.uint16)
    public readonly reserved: number = 0x0000;
}
