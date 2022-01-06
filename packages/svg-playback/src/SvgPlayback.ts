import { PointS, BasicPlayback, BrushStyle, PenStyle } from "@wmfjs/core";
import { decimalToCssString } from "./color";

export class SvgPlayback extends BasicPlayback {

    public svgElement: SVGElement;

    public constructor() {
        super();
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svgElement.setAttribute("version", "1.1");
    }

    private applyPenStyle(element: SVGElement): void {
        const { pen } = this.ctx;
        const flags = Object.keys(PenStyle).filter(v => /^PS_/.test(v)) as Array<keyof typeof PenStyle>;
        flags.forEach(f => {
            if (PenStyle[f] & pen.style) {
                console.log(f);
            }
        });
        element.setAttribute("stroke-width", pen.width.x.toString());
        element.setAttribute("stroke", decimalToCssString(pen.color));
        if (PenStyle.PS_NULL & pen.style) {
            element.setAttribute("stroke-width", "0");
        }
        if (PenStyle.PS_ENDCAP_FLAT & pen.style) {
            element.setAttribute("stroke-linecap", "round");
        }
        if (PenStyle.PS_JOIN_MITER & pen.style) {
            element.setAttribute("stroke-linejoin", "miter");
        }
    }

    private applyBrushStyle(element: SVGElement): void {
        const { brush } = this.ctx;
        if (brush.style === BrushStyle.BS_NULL) {
            element.setAttribute("fill", "none");
        } else if (brush.style === BrushStyle.BS_SOLID) {
            element.setAttribute("fill", decimalToCssString(brush.color));
        } else {
            console.warn("unsupported brush style", BrushStyle[brush.style]);
        }
    }

    protected updateViewBox(ext: PointS, origin: PointS): void {
        this.svgElement.setAttribute("viewBox", `${origin.x} ${origin.y} ${ext.x} ${ext.y}`);
    }

    protected drawPolygon(points: PointS[]): void {
        const { polyFillRule } = this.ctx;
        let d = `M ${points[0].x} ${points[0].y} `;
        d += points.slice(1).reduce((result, next) => {
            result += `L ${next.x} ${next.y} `;
            return result;
        }, "");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("fill-rule", polyFillRule);

        this.applyBrushStyle(path);
        this.applyPenStyle(path);

        this.svgElement.appendChild(path);
    }

}
