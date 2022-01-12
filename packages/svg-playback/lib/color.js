"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalToCssString = void 0;
function decimalToCssString(color) {
    return "#" + color.toString(16).padStart(6, "0");
}
exports.decimalToCssString = decimalToCssString;
