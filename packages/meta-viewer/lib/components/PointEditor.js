import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Layout = styled.div `
`;
const Input = styled.input `
  height: 22px;
`;
const Label = styled.span `
  line-height: 28px;
  background: red;
  display: inline-block;
  vertical-align: bottom;
`;
export function PointEditor(props) {
    return (_jsxs(Layout, { children: [_jsx(Label, { children: "x:" }, void 0), _jsx(Input, { value: props.value.x }, void 0)] }, void 0));
}
