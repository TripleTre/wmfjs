import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";

export class PointS extends Serializable {

    @readonly
    public get byteSize(): number {
        return 4;
    };

    @serialize(LiteralType.int16)
    public x: number = 0;

    @serialize(LiteralType.int16)
    public y: number = 0;

    public constructor(init?: { x: number, y: number }) {
        super();
        if (init) {
            this.x = init.x;
            this.y = init.y;
        }
    }

    public clone(from: PointS): void {
        this.x = from.x;
        this.y = from.y;
    }

    public equals(other: PointS): boolean {
        return this.x === other.x && this.y === other.y;
    }
}
