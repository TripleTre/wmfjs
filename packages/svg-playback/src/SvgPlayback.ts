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
    getCenteredArcEndPoint, ColorRef,
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
        this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.svgElement.setAttribute("version", "1.1");
        this.drawingCtx = {
            pen: new Pen(),
            brush: new LogBrush(),
            currentPathData: null,
            endPoint: new PointS(),
        };
    }

    private applyFontStyle(element: SVGTextElement): void {
        const { font } = this.ctx;
        if (font.height < 0) {
            element.setAttribute("font-size", `${Math.abs(font.height)}px`);
        }
        if (font.italic === 1) {
            element.setAttribute("font-style", "italic");
        }
        element.setAttribute("font-family", font.faceName);
    }

    private applyPenStyle(element: SVGElement): void {
        const { pen } = this.drawingCtx;
        // todo the min stroke-width seems to be related to PS_INSIDEFRAME
        const strokeWidth = Math.max(pen.width.x, 1);
        element.setAttribute("stroke-width", strokeWidth.toString());
        element.setAttribute("stroke", decimalToCssString(pen.colorRef.valueOf()));
        if ((pen.penStyle & 0x000f) === PenStyle.PS_NULL) {
            element.setAttribute("stroke-width", "0");
        }
        if (PenStyle.PS_ENDCAP_FLAT & pen.penStyle) {
            element.setAttribute("stroke-linecap", "round");
        }
        if (PenStyle.PS_JOIN_MITER & pen.penStyle) {
            element.setAttribute("stroke-linejoin", "miter");
        }
        // dash and dot
        if ((pen.penStyle & 0x000f) === PenStyle.PS_DOT) {
            element.setAttribute("stroke-dasharray", `${strokeWidth} ${strokeWidth}`);
        } else if ((pen.penStyle & 0x000f) === PenStyle.PS_DASH) {
            element.setAttribute("stroke-dasharray", `${3 * strokeWidth} ${strokeWidth}`);
        } else if ((pen.penStyle & 0x000f) === PenStyle.PS_DASHDOT) {
            element.setAttribute("stroke-dasharray", `${3 * strokeWidth} ${strokeWidth} ${strokeWidth} ${strokeWidth}`);
        } else if ((pen.penStyle & 0x000f) === PenStyle.PS_DASHDOTDOT) {
            element.setAttribute("stroke-dasharray", `${3 * strokeWidth} ${strokeWidth} ${strokeWidth} ${strokeWidth} ${strokeWidth} ${strokeWidth}`);
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
        this.drawingCtx.pen.duplicate(this.ctx.pen);
        this.drawingCtx.brush.duplicate(this.ctx.brush);
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

    protected fillPixel(point: PointS, color: ColorRef): void {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", point.x.toString());
        rect.setAttribute("y", point.y.toString());
        rect.setAttribute("width", "2");
        rect.setAttribute("height", "1");
        rect.setAttribute("fill", decimalToCssString(color.valueOf()));
        this.svgElement.appendChild(rect);
    }

    protected drawText(text: string, x: number, y: number, dx?: number[]): void {
        const { currentPosition } = this.ctx;
        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let d = 0;
        if (dx) {
            const chars = text.split("");
            for (let i = 0; i < chars.length; i++) {
                const span = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                span.textContent = chars[i];
                if (i > 0) {
                    d += dx[i - 1];
                    span.setAttribute("x", (x + currentPosition.x + d).toString());
                }
                textElement.appendChild(span);
            }
        } else {
            textElement.textContent = text;
        }
        textElement.setAttribute("x", (x + currentPosition.x).toString());
        textElement.setAttribute("y", (y + currentPosition.y).toString());
        textElement.setAttribute("alignment-baseline", "text-before-edge");
        this.applyFontStyle(textElement);
        this.svgElement.appendChild(textElement);
    }

    protected drawImage(src: string, width: number, height: number): void {
        const imageElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
        imageElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", src);
        imageElement.setAttribute("width", width.toString());
        imageElement.setAttribute("height", height.toString());
        imageElement.setAttribute("x", "0");
        imageElement.setAttribute("y", "0");
        this.svgElement.appendChild(imageElement);
    }

    protected playEnd(): void {
        this.endDrawing();
    }
}
