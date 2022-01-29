import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { CharacterSet, FontQuality, OutPrecision } from "../enums";
import { PitchAndFamily } from "./PitchAndFamily";

export class Font extends Serializable {

    @readonly
    public get byteSize(): number {
        return 50;
    };

    @serialize(LiteralType.int16)
    public height: number = 0;

    @serialize(LiteralType.int16)
    public width: number = 0;

    @serialize(LiteralType.int16)
    public escapement: number = 0;

    @serialize(LiteralType.int16)
    public orientation: number = 0;

    @serialize(LiteralType.int16)
    public weight: number = 0;

    @serialize(LiteralType.uint8)
    public italic: number = 0x00;

    @serialize(LiteralType.uint8)
    public underline: number = 0x00;

    @serialize(LiteralType.uint8)
    public StrikeOut: number = 0x00;

    @serialize(LiteralType.uint8)
    public charSet: CharacterSet = CharacterSet.DEFAULT_CHARSET;

    @serialize(LiteralType.uint8)
    public outPrecision: OutPrecision = OutPrecision.OUT_TT_PRECIS;

    @serialize(LiteralType.uint8)
    public clipPrecision: number = 0;

    @serialize(LiteralType.uint8)
    public quality: FontQuality = FontQuality.DEFAULT_QUALITY;

    @serialize()
    public pitchAndFamily: PitchAndFamily = new PitchAndFamily();

    @serialize({ characters: "Windows936", nullTerminated: true, byteLength: 32 })
    public faceName: string = "";
}
