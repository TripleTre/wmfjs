import { BasicPlayback, BrushStyle, PenStyle } from "@wmfjs/core";
import { decimalToCssString } from "./color";
export class SvgPlayback extends BasicPlayback {
    constructor(wmf) {
        super(wmf);
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svgElement.setAttribute("version", "1.1");
    }
    applyPenStyle(element) {
        const { pen } = this.ctx;
        const flags = Object.keys(PenStyle).filter(v => /^PS_/.test(v));
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
    applyBrushStyle(element) {
        const { brush } = this.ctx;
        if (brush.brushStyle === BrushStyle.BS_NULL) {
            element.setAttribute("fill", "none");
        }
        else if (brush.brushStyle === BrushStyle.BS_SOLID) {
            element.setAttribute("fill", decimalToCssString(brush.colorRef.valueOf()));
        }
        else {
            console.warn("unsupported brush style", BrushStyle[brush.brushStyle]);
        }
    }
    updateViewBox(ext, origin) {
        this.svgElement.setAttribute("viewBox", `${origin.x} ${origin.y} ${ext.x} ${ext.y}`);
    }
    drawPolygon(points) {
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
