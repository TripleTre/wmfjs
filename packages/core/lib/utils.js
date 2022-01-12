"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerAngle = void 0;
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
