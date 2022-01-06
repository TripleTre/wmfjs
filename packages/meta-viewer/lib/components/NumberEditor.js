import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
export function NumberEditor(props) {
    const changeHandler = useCallback((evt) => {
    }, []);
    return (_jsx("input", { type: "number", value: props.value, onChange: changeHandler }, void 0));
}
