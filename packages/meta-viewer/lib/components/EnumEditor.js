import { jsx as _jsx } from "react/jsx-runtime";
export function EnumEditor(props) {
    const keys = Object.keys(props.enum).filter(v => /^\d+$/.test(v));
    return (_jsx("select", { children: keys.map(k => {
            return (_jsx("option", { children: props.enum[k] }, props.enum[k]));
        }) }, void 0));
}
