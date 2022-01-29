import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";

export class ColorRef extends Serializable {

    @readonly
    public get byteSize(): number {
        return 4;
    };

    @serialize(LiteralType.uint8)
    public r: number = 0;

    @serialize(LiteralType.uint8)
    public g: number = 0;

    @serialize(LiteralType.uint8)
    public b: number = 0;

    @serialize(LiteralType.uint8)
    public reserved: number = 0x00;

    public constructor(init?: { r: number, g: number, b: number }) {
        super();
        if (init) {
            this.r = init.r;
            this.g = init.g;
            this.b = init.b;
        }
    }

    public equals(target: ColorRef): boolean {
        return (
            this.r === target.r &&
            this.g === target.g &&
            this.b === target.b
        );
    }

    public valueOf(): number {
        return this.r * 0x10000 + this.g * 0x100 + this.b;
    }
}
