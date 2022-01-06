import { Header, Placeable } from "./types";
import { RecordType } from "./enums";
export interface RecordItem {
    fn: keyof typeof RecordType;
    payload: any;
    offset: number;
}
export interface RecordsData {
    placeable: Placeable | null;
    header: Header;
    records: RecordItem[];
}
export declare function parser(input: ArrayBuffer): RecordsData;
