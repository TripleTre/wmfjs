import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import { useCallback } from "react";
const Layout = styled.div `
`;
export function MultiNumberEditor(props) {
    const changeHandler = useCallback(() => {
    }, []);
    return (_jsx(Layout, { children: props.value.map((v, i) => _jsx("input", { type: "number", value: v, onChange: changeHandler }, i)) }, void 0));
}
