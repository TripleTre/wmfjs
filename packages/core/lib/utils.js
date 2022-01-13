"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCenteredArc = exports.centerAngle = void 0;
function centerAngle(x, y) {
    let angle = Math.atan(Math.abs(y / x));
    if (x < 0 && y > 0) {
        angle = Math.PI + angle;
    }
    else if (x < 0 && y < 0) {
        angle = Math.PI - angle;
    }
    else if (x > 0 && y > 0) {
        angle = Math.PI / 2 - angle + Math.PI / 2 * 3;
    }
    return angle;
}
exports.centerAngle = centerAngle;
function toCenteredArc(yEnd, xEnd, yStart, xStart, l, r, t, b) {
    const cx = (l + r) / 2;
    const cy = (t + b) / 2;
    const rx = (r - l) / 2;
    const ry = (b - t) / 2;
    const sx = xStart - cx;
    const sy = cy - yStart;
    const stAngle = centerAngle(sx, sy);
    const ex = xEnd - cx;
    const ey = cy - yEnd;
    const enAngle = centerAngle(ex, ey);
    let swAngle = enAngle - stAngle;
    while (swAngle < 0) {
        swAngle += Math.PI * 2;
    }
    return {
        cx, cy, rx, ry, stAngle, swAngle
    };
}
exports.toCenteredArc = toCenteredArc;
