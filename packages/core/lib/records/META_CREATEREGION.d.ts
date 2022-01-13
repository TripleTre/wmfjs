import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { Region } from "../structs/Region";
export declare class META_CREATEREGION extends SerializableRecord {
    get recordSize(): number;
    recordFunction: RecordType;
    region: Region;
}
