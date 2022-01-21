import { Pen } from "./structs/Pen";
import { LogBrush } from "./structs/LogBrush";
import { PointS } from "./structs";
import { PostScriptJoin } from "./enums";

export interface IPlaybackCtx {
    pen: Pen;
    brush: LogBrush;
    textAlign: number;
    textColor: number;
    polyFillRule: "evenodd" | "nonzero";
    miterLimit: number;
    lineJoin: PostScriptJoin;
    backgroundColor?: number;
    currentPosition: PointS;
}
