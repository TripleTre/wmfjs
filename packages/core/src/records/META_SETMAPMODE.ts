import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { MapMode, RecordType } from "../enums";

export class META_SETMAPMODE extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public readonly recordSize: number = 8;

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_SETMAPMODE;

    @serialize(LiteralType.uint16)
    public mapMode: MapMode = MapMode.MM_ANISOTROPIC;
}
