import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, optional, readonly, serialize } from "../decorators";
import { ExtTextOutOptions, RecordType } from "../enums";
import { Rect } from "../structs";

export class META_EXTTEXTOUT extends SerializableRecord {
    private _stringLength: number = 0;

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        const rectSize = this.rectangle ? 8 : 0;
        return (14 + rectSize + this.string.byteLength) / BYTE_PER_WORD;
    }

    @serialize(LiteralType.uint16)
    public recordFunction: RecordType = RecordType.META_EXTTEXTOUT;

    @serialize(LiteralType.int16)
    public y: number = 0;

    @serialize(LiteralType.int16)
    public x: number = 0;

    @serialize(LiteralType.int16)
    public get stringLength(): number {
        return this._stringLength;
    }
    public set stringLength(value: number) {
        this._stringLength = value;
        this.dx = new Array(value);
    }

    @serialize(LiteralType.uint16)
    public fwOpts: number = 0;

    @optional((_this: META_EXTTEXTOUT) => !!(_this.fwOpts & ExtTextOutOptions.ETO_OPAQUE || _this.fwOpts & ExtTextOutOptions.ETO_CLIPPED))
    @serialize()
    public rectangle?: Rect;

    @serialize({ type: "ArrayBuffer", align: true, byteLength: (_this: META_EXTTEXTOUT) => _this.stringLength })
    public string: ArrayBuffer = new ArrayBuffer(0);

    @optional()
    @serialize({ collection: Array, element: LiteralType.int16 })
    public dx: number[] = [];
}
