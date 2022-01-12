import { PointS, BasicPlayback, BrushStyle, PenStyle, WindowsMetaFile, CenteredArc } from "@wmfjs/core";
import { decimalToCssString } from "./color";

export class SvgPlayback extends BasicPlayback {

    public svgElement: SVGElement;

    public constructor(wmf: WindowsMetaFile) {
        super(wmf);
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svgElement.setAttribute("version", "1.1");
    }

    private applyPenStyle(element: SVGElement): void {
        const { pen } = this.ctx;
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
        const { brush } = this.ctx;
        if (brush.brushStyle === BrushStyle.BS_NULL) {
            element.setAttribute("fill", "none");
        } else if (brush.brushStyle === BrushStyle.BS_SOLID) {
            element.setAttribute("fill", decimalToCssString(brush.colorRef.valueOf()));
        } else {
            console.warn("unsupported brush style", BrushStyle[brush.brushStyle]);
        }
    }

    private postPathProcessor(element: SVGPathElement): void {
        const { polyFillRule } = this.ctx;
        element.setAttribute("fill-rule", polyFillRule);
        this.applyPenStyle(element);
        this.applyBrushStyle(element);
    }

    protected updateViewBox(ext: PointS, origin: PointS): void {
        this.svgElement.setAttribute("viewBox", `${origin.x} ${origin.y} ${ext.x} ${ext.y}`);
    }

    protected drawPolygon(points: PointS[]): void {
        let d = `M ${points[0].x} ${points[0].y} `;
        d += points.slice(1).reduce((result, next) => {
            result += `L ${next.x} ${next.y} `;
            return result;
        }, "");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        this.postPathProcessor(path);
        this.svgElement.appendChild(path);
    }

    protected drawArc(arc: CenteredArc): void {
        const x0 = arc.cx + arc.rx * Math.cos(arc.stAngle);
        const y0 = arc.cy + arc.ry * Math.sin(arc.stAngle);
        const x1 = arc.cx + arc.rx * Math.cos(arc.stAngle + arc.swAngle);
        const y1 = arc.cy + arc.ry * Math.sin(arc.stAngle + arc.swAngle);
        const largeArc = arc.swAngle > Math.PI ? 0 : 1;
        const sweep = arc.swAngle > 0 ? 0 : 1;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${x0} ${y0} A ${arc.rx} ${arc.ry} 0 ${largeArc} ${sweep} ${x1} ${y1}`);
        this.postPathProcessor(path);
        path.setAttribute("fill", "none");
        this.svgElement.appendChild(path);
    }
}
