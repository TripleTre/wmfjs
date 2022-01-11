import { Pen } from "./structs/Pen";
import { LogBrush } from "./structs/LogBrush";
export interface IPlaybackCtx {
    pen: Pen;
    brush: LogBrush;
    textAlign: number;
    textColor: number;
    polyFillRule: "evenodd" | "nonzero";
    miterLimit: number;
    backgroundColor?: number;
}
