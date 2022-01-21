import {
    PointS,
    BasicPlayback,
    BrushStyle,
    PenStyle,
    WindowsMetaFile,
    CenteredArc,
    Pen,
    LogBrush,
    PostScriptJoin,
    getCenteredArcStartPoint,
    getCenteredArcEndPoint,
} from "@wmfjs/core";
import { decimalToCssString } from "./color";

export interface DrawingContext {
    pen: Pen;
    brush: LogBrush;
    endPoint: PointS;
    currentPathData: string | null;
}

export const LineJoinMap = {
    [PostScriptJoin.PostScriptMiterJoin]: "miter",
    [PostScriptJoin.PostScriptRoundJoin]: "round",
    [PostScriptJoin.PostScriptBevelJoin]: "bevel",
    [PostScriptJoin.PostScriptNotSet]: "round",
}

export class SvgPlayback extends BasicPlayback {

    public svgElement: SVGElement;

    private drawingCtx: DrawingContext;

    public constructor(wmf: WindowsMetaFile) {
        super(wmf);
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svgElement.setAttribute("version", "1.1");
        this.drawingCtx = {
            pen: new Pen(),
            brush: new LogBrush(),
            currentPathData: null,
            endPoint: new PointS(),
        };
    }

    private applyPenStyle(element: SVGElement): void {
        const { pen } = this.drawingCtx;
        const flags = Object.keys(PenStyle).filter(v => /^PS_/.test(v)) as Array<keyof typeof PenStyle>;
        flags.forEach(f => {
            if (PenStyle[f] & pen.penStyle) {
                console.log(f);
            }
        });
        element.setAttribute("stroke-width", pen.width.x.toString());
        element.setAttribute("stroke", decimalToCssString(pen.colorRef.valueOf()));
        if (PenStyle.PS_NULL & pen.penStyle) {
            element.setAttribute("stroke-width", "0");
        }
        if (PenStyle.PS_ENDCAP_FLAT & pen.penStyle) {
            element.setAttribute("stroke-linecap", "round");
        }
        if (PenStyle.PS_JOIN_MITER & pen.penStyle) {
            element.setAttribute("stroke-linejoin", "miter");
        }
    }

    private applyBrushStyle(element: SVGElement): void {
        const { brush } = this.drawingCtx;
        if (brush.brushStyle === BrushStyle.BS_NULL) {
            element.setAttribute("fill", "none");
        } else if (brush.brushStyle === BrushStyle.BS_SOLID) {
            element.setAttribute("fill", decimalToCssString(brush.colorRef.valueOf()));
        } else {
            console.warn("unsupported brush style", BrushStyle[brush.brushStyle]);
        }
    }

    private postDisplayElementProcessor(element: SVGElement): void {
        const { polyFillRule, lineJoin } = this.ctx;
        element.setAttribute("fill-rule", polyFillRule);
        element.setAttribute("stroke-linejoin", LineJoinMap[lineJoin]);
        this.applyPenStyle(element);
        this.applyBrushStyle(element);
    }

    private needCreatePath(): boolean {
        return !this.drawingCtx.pen.equals(this.ctx.pen) ||
            !this.drawingCtx.brush.equals(this.ctx.brush)
    }

    private endDrawing(): void {
        if (this.drawingCtx.currentPathData) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", this.drawingCtx.currentPathData);
            this.postDisplayElementProcessor(path);
            this.svgElement.appendChild(path);
        }
    }

    private startDrawing(): void {
        if (this.drawingCtx.currentPathData === null) {
            this.drawingCtx.currentPathData = "";
        } else if (this.needCreatePath()) {
            this.endDrawing();
            this.drawingCtx.currentPathData = "";
        }
        this.drawingCtx.pen.clone(this.ctx.pen);
        this.drawingCtx.brush.clone(this.ctx.brush);
    }

    protected updateViewBox(ext: PointS, origin: PointS): void {
        this.svgElement.setAttribute("viewBox", `${origin.x} ${origin.y} ${ext.x} ${ext.y}`);
    }

    protected drawPolygon(points: PointS[], close: boolean): void {
        this.startDrawing();
        if (!this.drawingCtx.endPoint.equals(points[0])) {
            this.drawingCtx.currentPathData += ` M ${points[0].x} ${points[0].y}`;
        }
        this.drawingCtx.currentPathData += points.slice(1).reduce((result, next) => {
            result += ` L ${next.x} ${next.y} `;
            return result;
        }, "");
        if (close) {
            this.drawingCtx.currentPathData += " Z";
        }
        this.drawingCtx.endPoint = points[points.length - 1];
    }

    protected drawArc(arc: CenteredArc, close: boolean): void {
        this.startDrawing();
        const startPoint = getCenteredArcStartPoint(arc);
        const endPoint = getCenteredArcEndPoint(arc);
        const largeArc = arc.swAngle > Math.PI ? 1 : 0;
        if (this.drawingCtx.endPoint.x !== startPoint.x || this.drawingCtx.endPoint.y !== startPoint.y) {
            this.drawingCtx.currentPathData += ` M ${startPoint.x} ${startPoint.y}`;
        }
        this.drawingCtx.currentPathData += `  A ${arc.rx} ${arc.ry} 0 ${largeArc} ${arc.sweep} ${endPoint.x} ${endPoint.y}`;
        if (close) {
            this.drawingCtx.currentPathData += " Z";
        }
        this.drawingCtx.endPoint.x = endPoint.x;
        this.drawingCtx.endPoint.y = endPoint.y;
    }

    protected drawLine(point: PointS): void {
        this.startDrawing();
        if (!this.drawingCtx.endPoint.equals(this.ctx.currentPosition)) {
            this.drawingCtx.currentPathData += ` M ${this.ctx.currentPosition.x} ${this.ctx.currentPosition.y}`;
        }
        this.drawingCtx.currentPathData += ` L ${point.x} ${point.y}`;
        this.drawingCtx.endPoint = point;
    }

    protected playEnd(): void {
        this.endDrawing();
    }
}
