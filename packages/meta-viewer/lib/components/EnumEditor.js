import { jsx as _jsx } from "react/jsx-runtime";
import Select from "react-select";
import { useCallback } from "react";
const selectStyles = {
    control: (styles) => (Object.assign(Object.assign({}, styles), { backgroundColor: "rgb(50, 50, 50)", outline: "none", fontSize: "14px" })),
    singleValue: (styles) => (Object.assign(Object.assign({}, styles), { color: "#fff" })),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => (Object.assign(Object.assign({}, styles), { color: isFocused ? "#fff" : "rgb(186,186,186)", backgroundColor: isFocused ? "rgb(186,186,186)" : "#fff" })),
};
export function EnumEditor(props) {
    const keys = Object.keys(props.enum).filter(v => !/^\d+$/.test(v));
    const optionData = keys.map(k => ({ value: props.enum[k], label: k }));
    let value;
    if (!props.multi) {
        value = optionData.find(v => v.value === props.value);
    }
    else {
        value = keys.reduce((result, next) => {
            if ((props.value & props.enum[next]) === props.enum[next]) {
                result.push(next);
            }
            return result;
        }, []).map(key => optionData.find(v => v.label === key));
    }
    const changeHandler = useCallback((value) => {
        if (props.onChange && props.editable) {
            if (!props.multi) {
                props.onChange(value.value);
            }
            else {
                // if (value.some((v: any) => v.value === 0) && props.value !== 0) {
                //     props.onChange(0);
                // } else {
                props.onChange(value.reduce((result, next) => {
                    return result | next.value;
                }, 0));
                // }
            }
        }
    }, [props.onChange, props.editable]);
    const themeCallback = useCallback((theme) => (Object.assign(Object.assign({}, theme), { colors: Object.assign(Object.assign({}, theme.colors), { primary: "rgb(255, 255, 255)", primary75: "rgba(255, 255, 255, 0.75)", primary50: "rgba(255, 255, 255, 0.5)", primary25: "rgba(255, 255, 255, 0.25)", neutral0: "rgb(50, 50, 50)", neutral20: "rgb(186, 186, 186)", danger: "rgb(158, 41, 39)" }) })), []);
    return (_jsx(Select, { value: value, options: optionData, styles: selectStyles, isMulti: props.multi, theme: themeCallback, onChange: changeHandler }, void 0));
}
