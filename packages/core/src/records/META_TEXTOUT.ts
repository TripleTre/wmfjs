import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { RecordType } from "../enums";

export class META_TEXTOUT extends SerializableRecord {
    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return (12 + this.string.byteLength) / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_TEXTOUT;

    @serialize(LiteralType.int16)
    public stringLength: number = 0;

    @serialize({ type: "ArrayBuffer", align: true, byteLength: (_this: META_TEXTOUT) => _this.stringLength })
    public string: ArrayBuffer = new ArrayBuffer(0);

    @serialize(LiteralType.int16)
    public yStart: number = 0;

    @serialize(LiteralType.int16)
    public xStart: number = 0;
}
