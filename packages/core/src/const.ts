import { CharacterSet } from "./enums";

export const CharSetMap: {
    [key in keyof typeof CharacterSet]: string
} = {
    ANSI_CHARSET: "Windows1252",
    DEFAULT_CHARSET: "iso-8859-1",
    SYMBOL_CHARSET: "Windows42",
    MAC_CHARSET: "macintosh",
    SHIFTJIS_CHARSET: "Windows932",
    HANGUL_CHARSET: "Windows949",
    JOHAB_CHARSET: "Windows1361",
    GB2312_CHARSET: "Windows936",
    CHINESEBIG5_CHARSET: "Windows950",
    GREEK_CHARSET: "Windows1253",
    TURKISH_CHARSET: "Windows1254",
    VIETNAMESE_CHARSET: "Windows1258",
    HEBREW_CHARSET: "Windows1255",
    ARABIC_CHARSET: "Windows1256",
    BALTIC_CHARSET: "Windows1257",
    RUSSIAN_CHARSET: "Windows1251",
    THAI_CHARSET: "Windows874",
    EASTEUROPE_CHARSET: "Windows1250",
    OEM_CHARSET: "Windows437",
};
