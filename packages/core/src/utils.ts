import { CenteredArc } from "./types";
import { PointS } from "./structs";

export function centerAngle(x: number, y: number): number {
    let angle = Math.atan(Math.abs(y / x));
    if (x < 0 && y > 0) {
        angle = Math.PI - angle;
    } else if (x < 0 && y < 0) {
        angle = Math.PI + angle;
    } else if (x > 0 && y < 0) {
        angle = Math.PI / 2 - angle + Math.PI / 2 * 3;
    }
    return angle;
}

export function toCenteredArc(
    yEnd: number, xEnd: number, yStart: number, xStart: number,
    l: number, r: number, t: number, b: number,
): CenteredArc {
    const cx = (l + r) / 2;
    const cy = (t + b) / 2;
    const rx = Math.abs(r - l) / 2;
    const ry = (b - t) / 2;

    const sx = xStart - cx;
    const sy = cy - yStart;
    const stAngle = centerAngle(sx, sy);

    const ex = xEnd - cx;
    const ey = cy - yEnd;
    let enAngle = centerAngle(ex, ey);

    while (enAngle < stAngle) {
        enAngle += Math.PI * 2;
    }
    let swAngle = enAngle - stAngle;

    return {
        cx, cy, rx, ry, stAngle, swAngle, sweep: 0,
    };
}

export function getPointLieEllipse(rx: number, ry: number, angle: number): PointS {
    while (angle > Math.PI * 2) {
        angle -= Math.PI * 2;
    }
    while (angle < 0) {
        angle += Math.PI * 2;
    }
    let fx = (angle < Math.PI / 2 || angle > Math.PI / 2 * 3) ? 1 : -1;
    let fy = (angle < Math.PI && angle > 0) ? 1 : -1;
    return new PointS({
        x: fx * rx * ry / (Math.sqrt(ry * ry + rx * rx * Math.tan(angle) * Math.tan(angle))),
        y: fy * rx * ry / (Math.sqrt(rx * rx + ry * ry / (Math.tan(angle) * Math.tan(angle)))),
    });
}

export function getCenteredArcStartPoint(arc: CenteredArc): PointS {
    const p = getPointLieEllipse(arc.rx, arc.ry, arc.stAngle);
    p.x = arc.cx + p.x;
    p.y = arc.cy - p.y;
    return p;
}

export function getCenteredArcEndPoint(arc: CenteredArc): PointS {
    const angle = arc.sweep === 0 ? arc.stAngle + arc.swAngle : arc.stAngle - arc.swAngle;
    const p = getPointLieEllipse(arc.rx, arc.ry, angle);
    p.x = arc.cx + p.x;
    p.y = arc.cy - p.y;
    return p;
}
