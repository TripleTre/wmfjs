import { Pen } from "./structs/Pen";
import { LogBrush } from "./structs/LogBrush";
import { PointS } from "./structs";
import { PostScriptJoin } from "./enums";
import { Font } from "./structs/Font";

export interface IPlaybackCtx {
    pen: Pen;
    font: Font;
    brush: LogBrush;
    textAlign: number;
    textColor: number;
    polyFillRule: "evenodd" | "nonzero";
    miterLimit: number;
    lineJoin: PostScriptJoin;
    backgroundColor?: number;
    currentPosition: PointS;
}
