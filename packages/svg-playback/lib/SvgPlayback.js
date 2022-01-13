"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgPlayback = void 0;
const core_1 = require("@wmfjs/core");
const color_1 = require("./color");
class SvgPlayback extends core_1.BasicPlayback {
    constructor(wmf) {
        super(wmf);
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svgElement.setAttribute("version", "1.1");
    }
    applyPenStyle(element) {
        const { pen } = this.ctx;
        const flags = Object.keys(core_1.PenStyle).filter(v => /^PS_/.test(v));
        flags.forEach(f => {
            if (core_1.PenStyle[f] & pen.penStyle) {
                console.log(f);
            }
        });
        element.setAttribute("stroke-width", pen.width.x.toString());
        element.setAttribute("stroke", (0, color_1.decimalToCssString)(pen.colorRef.valueOf()));
        if (core_1.PenStyle.PS_NULL & pen.penStyle) {
            element.setAttribute("stroke-width", "0");
        }
        if (core_1.PenStyle.PS_ENDCAP_FLAT & pen.penStyle) {
            element.setAttribute("stroke-linecap", "round");
        }
        if (core_1.PenStyle.PS_JOIN_MITER & pen.penStyle) {
            element.setAttribute("stroke-linejoin", "miter");
        }
    }
    applyBrushStyle(element) {
        const { brush } = this.ctx;
        if (brush.brushStyle === core_1.BrushStyle.BS_NULL) {
            element.setAttribute("fill", "none");
        }
        else if (brush.brushStyle === core_1.BrushStyle.BS_SOLID) {
            element.setAttribute("fill", (0, color_1.decimalToCssString)(brush.colorRef.valueOf()));
        }
        else {
            console.warn("unsupported brush style", core_1.BrushStyle[brush.brushStyle]);
        }
    }
    postDisplayElementProcessor(element) {
        const { polyFillRule } = this.ctx;
        element.setAttribute("fill-rule", polyFillRule);
        this.applyPenStyle(element);
        this.applyBrushStyle(element);
    }
    updateViewBox(ext, origin) {
        this.svgElement.setAttribute("viewBox", `${origin.x} ${origin.y} ${ext.x} ${ext.y}`);
    }
    drawPolygon(points) {
        let d = `M ${points[0].x} ${points[0].y} `;
        d += points.slice(1).reduce((result, next) => {
            result += `L ${next.x} ${next.y} `;
            return result;
        }, "");
        d += " Z";
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        this.postDisplayElementProcessor(path);
        this.svgElement.appendChild(path);
    }
    drawArc(arc, close) {
        const x0 = arc.cx + arc.rx * Math.cos(arc.stAngle);
        const y0 = arc.cy + arc.ry * Math.sin(arc.stAngle);
        const x1 = arc.cx + arc.rx * Math.cos(arc.stAngle + arc.swAngle);
        const y1 = arc.cy + arc.ry * Math.sin(arc.stAngle + arc.swAngle);
        const largeArc = arc.swAngle > Math.PI ? 0 : 1;
        const sweep = arc.swAngle > 0 ? 0 : 1;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d = `M ${x0} ${y0} A ${arc.rx} ${arc.ry} 0 ${largeArc} ${sweep} ${x1} ${y1}`;
        if (close) {
            d += " Z";
        }
        path.setAttribute("d", d);
        this.postDisplayElementProcessor(path);
        this.svgElement.appendChild(path);
    }
    drawEllipse(cx, cy, rx, ry) {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", cx.toString());
        ellipse.setAttribute("cy", cy.toString());
        ellipse.setAttribute("rx", rx.toString());
        ellipse.setAttribute("ry", ry.toString());
        this.postDisplayElementProcessor(ellipse);
        this.svgElement.appendChild(ellipse);
    }
}
exports.SvgPlayback = SvgPlayback;
