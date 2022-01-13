import { PointS, BasicPlayback, WindowsMetaFile, CenteredArc } from "@wmfjs/core";
export declare class SvgPlayback extends BasicPlayback {
    svgElement: SVGElement;
    constructor(wmf: WindowsMetaFile);
    private applyPenStyle;
    private applyBrushStyle;
    private postDisplayElementProcessor;
    protected updateViewBox(ext: PointS, origin: PointS): void;
    protected drawPolygon(points: PointS[]): void;
    protected drawArc(arc: CenteredArc, close: boolean): void;
    protected drawEllipse(cx: number, cy: number, rx: number, ry: number): void;
}
