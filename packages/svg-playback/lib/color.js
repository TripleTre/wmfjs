export function decimalToCssString(color) {
    return "#" + color.toString(16).padStart(6, "0");
}
