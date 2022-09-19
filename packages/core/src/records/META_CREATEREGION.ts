import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";
import { Region } from "../structs/Region";

export class META_CREATEREGION extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return (6 + this.region.byteSize) / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_CREATEREGION;

    @serialize()
    public region: Region = new Region();
}
