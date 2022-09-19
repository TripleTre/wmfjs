import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { Scan } from "./Scan";

export class Region extends Serializable {

    @readonly
    public get byteSize(): number {
        return 14 + this.aScans.reduce((result, next) => {
            result += next.byteSize;
            return result;
        }, 0);
    };

    @serialize(LiteralType.uint16)
    public nextInChain: number = 0;

    @serialize(LiteralType.int16)
    public objectType: number = 0x0006;

    @serialize(LiteralType.uint32)
    public objectCount: number = 0;

    @serialize(LiteralType.int16)
    public get regionSize(): number {
        return this.aScans.reduce((result, next) => {
            result += next.byteSize;
            return result;
        }, 0);
    };

    @serialize(LiteralType.int16)
    public get scanCount(): number {
        return this.aScans.length;
    };
    public set scanCount(v: number) {
        if (this.aScans.length === 0) {
            for (let i = 0; i < v; i++) {
                this.aScans.push(new Scan());
            }
        }
    };

    @serialize(LiteralType.int16)
    public get maxScan(): number {
        const sorted = this.aScans.sort((a, b) => a.scanLines.length - b.scanLines.length);
        return sorted[0]?.scanLines.length || 0;
    };

    public aScans: Scan[] = [];
}
