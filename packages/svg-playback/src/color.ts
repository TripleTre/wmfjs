export function decimalToCssString(color: number): string {
    return "#" + color.toString(16).padStart(6, "0");
}
