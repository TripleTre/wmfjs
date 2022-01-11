import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import { useCallback } from "react";
import { NumberEditor } from "./NumberEditor";
const Layout = styled.div `
  & input:first-child {
    margin-left: 0;
  }
  & input:last-child {
    margin-right: 0;
  }
  & input {
    margin: 0 6px;
  }
`;
export function MultiNumberEditor(props) {
    const changeHandler = useCallback((index, value) => {
        if (props.onChange && props.editable) {
            const next = props.value.concat([]);
            next[index] = value;
            props.onChange(next);
        }
    }, [props.onChange, props.editable, props.value]);
    return (_jsx(Layout, { children: props.value.map((v, i) => _jsx(NumberEditor, { limit: props.limit, editable: props.editable, value: v, onChange: (value) => changeHandler(i, value) }, i)) }, void 0));
}
