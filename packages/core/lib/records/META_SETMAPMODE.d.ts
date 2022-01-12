import { SerializableRecord } from "../Serializable";
import { MapMode, RecordType } from "../enums";
export declare class META_SETMAPMODE extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    mapMode: MapMode;
}
