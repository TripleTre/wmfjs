import { BYTE_PER_WORD, SerializableRecord } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { MapMode, RecordType } from "../enums";

export class META_SETMAPMODE extends SerializableRecord {

    @readonly
    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 8 / BYTE_PER_WORD;
    };

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETMAPMODE;

    @serialize(LiteralType.uint16)
    public mapMode: MapMode = MapMode.MM_ANISOTROPIC;
}
