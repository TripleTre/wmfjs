import { Serializable } from "../Serializable";
import { FamilyFont, PitchFont } from "../enums";
import { LiteralType, readonly, serialize } from "../decorators";

export class PitchAndFamily extends Serializable {

    @readonly
    public get byteSize(): number {
        return 1;
    };

    @serialize(LiteralType.uint8)
    public get data(): number {
        return parseInt(this.family.toString(2).padStart(4, "0") + "00" + this.pitch.toString(2).padStart(2, "0"), 2);
    };
    public set data(value: number) {
        const binaryStr = value.toString(2).padStart(8, "0");
        this.family = parseInt(binaryStr.slice(0, 4)) as any;
        this.pitch = parseInt(binaryStr.slice(6, 8)) as any;
    };

    public family: FamilyFont = FamilyFont.FF_MODERN;

    public pitch: PitchFont = PitchFont.DEFAULT_PITCH;
}
