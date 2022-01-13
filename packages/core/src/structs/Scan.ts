import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { ScanLine } from "./ScanLine";

export class Scan extends Serializable {

    @readonly
    public get byteSize(): number {
        return 2 + 2 + 2 + this.scanLines.length * 4;
    };

    @readonly
    @serialize(LiteralType.uint16)
    public get count(): number {
        return this.scanLines.length / 2;
    };

    @serialize(LiteralType.uint16)
    public top: number = 0;

    @serialize(LiteralType.uint16)
    public bottom: number = 0;

    @serialize({ collection: Array, element: ScanLine })
    public scanLines: ScanLine[] = [];

    @readonly
    @serialize(LiteralType.uint16)
    public get count2(): number {
        return this.count;
    }
}
