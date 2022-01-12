import { META_HEADER, META_PLACEABLE } from "./records";
import { SerializableRecord } from "./Serializable";
export declare class WindowsMetaFile {
    placeable?: META_PLACEABLE;
    header: META_HEADER;
    records: SerializableRecord[];
    constructor();
    deserialize(input: ArrayBuffer): void;
    serialize(): ArrayBuffer;
}
