import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Layout = styled.div `
  background: rgb(49, 51, 53);
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span `
  font-size: 16px;
  color: rgb(232, 191, 106);
`;
const SubTitle = styled.span `
  color: rgb(152, 118, 170);
  font-size: 14px;
`;
const OffsetNum = styled.div `
  font-size: 12px;
  color: rgb(153, 164, 178);
`;
export function Header(props) {
    return (_jsxs(Layout, { children: [_jsxs("div", { children: [_jsx(Title, { children: props.title }, void 0), props.subTitle && _jsxs(SubTitle, { children: [_jsx("span", { children: " - " }, void 0), _jsx("span", { children: props.subTitle }, void 0)] }, void 0)] }, void 0), _jsxs(OffsetNum, { children: ["[", props.offset, "]"] }, void 0)] }, void 0));
}
