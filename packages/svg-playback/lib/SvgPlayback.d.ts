import { PointS, BasicPlayback, WMF } from "@wmfjs/core";
export declare class SvgPlayback extends BasicPlayback {
    svgElement: SVGElement;
    constructor(wmf: WMF);
    private applyPenStyle;
    private applyBrushStyle;
    protected updateViewBox(ext: PointS, origin: PointS): void;
    protected drawPolygon(points: PointS[]): void;
}
