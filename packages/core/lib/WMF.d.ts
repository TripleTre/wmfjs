import { META_PLACEABLE } from "./records/META_PLACEABLE";
import { META_HEADER } from "./records/META_HEADER";
import { SerializableRecord } from "./Serializable";
export declare class WMF {
    placeable?: META_PLACEABLE;
    header: META_HEADER;
    records: SerializableRecord[];
    constructor(header: META_HEADER, placeable?: META_PLACEABLE);
}
