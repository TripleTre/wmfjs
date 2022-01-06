import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { Header } from "./Header";
const LineLayout = styled.div `
`;
const Content = styled.div `
    padding: 6px 22px;
`;
export function ViewerLine(props) {
    return (_jsxs(LineLayout, { children: [_jsx(Header, { subTitle: props.subHeader, title: props.header, offset: props.offset }, void 0), _jsx(Content, { children: props.children }, void 0)] }, void 0));
}
