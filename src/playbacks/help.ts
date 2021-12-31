import { PenStyle } from "../enums";

export function penStyleToAttrs(penStyle: number): any {
    const flags = Object.keys(PenStyle).filter(v => /^PS_/.test(v)) as Array<keyof typeof PenStyle>;
    flags.forEach((flag) => {
        if (PenStyle[flag] & penStyle) {
            console.log(flag, PenStyle[flag] & penStyle);
        }
    });
}
