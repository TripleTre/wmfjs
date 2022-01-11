import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { PointEditor } from "./PointEditor";
const Layout = styled.div `
  display: flex;
  flex-wrap: wrap;
`;
const No = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 18px 2px 0px;
`;
const Label = styled.div `
  color: rgb(186,186,186);
`;
export function MultiPointEditor(props) {
    return (_jsx(Layout, { children: props.value.map((point, index) => (_jsxs(No, { children: [_jsx(Label, Object.assign({ style: { width: `${props.value.length.toString().length * 12}px` } }, { children: index }), void 0), _jsx(PointEditor, { value: point }, index)] }, index))) }, void 0));
}
