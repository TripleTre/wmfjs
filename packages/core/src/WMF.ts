import { META_PLACEABLE } from "./records/META_PLACEABLE";
import { META_HEADER } from "./records/META_HEADER";
import { SerializableRecord } from "./Serializable";

export class WMF {

    public placeable?: META_PLACEABLE;
    public header: META_HEADER;

    public records: SerializableRecord[] = [];

    public constructor(header: META_HEADER, placeable?: META_PLACEABLE) {
        this.header = header;
        this.placeable = placeable;
    }

}