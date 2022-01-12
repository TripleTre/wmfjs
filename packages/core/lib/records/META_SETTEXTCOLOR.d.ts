import { SerializableRecord } from "../Serializable";
import { RecordType } from "../enums";
import { ColorRef } from "../structs/ColorRef";
export declare class META_SETTEXTCOLOR extends SerializableRecord {
    get recordSize(): number;
    readonly recordFunction: RecordType;
    colorRef: ColorRef;
}
