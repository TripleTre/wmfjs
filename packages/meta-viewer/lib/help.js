export function editAttrToString(name, value, config) {
    if ((config === null || config === void 0 ? void 0 : config.type) === "enum") {
        return `${name}=${config.enum[value]}`;
    }
    else {
        return `${name}=${value.toString()}`;
    }
}
