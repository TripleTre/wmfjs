import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Layout = styled.div `
  & *:first-child {
    margin-left: 0;
  }
  & *:last-child {
    margin-right: 0;
  }
  & * {
    margin: 0 3px;
  }
`;
const Key = styled.div `
  color: rgb(186, 186, 186);
  font-size: 12px;
  border: 1px solid rgb(186, 186, 186);
  display: inline-block;
  border-radius: 2px;
  padding: 2px 4px;
`;
const Add = styled.div `
  display: inline-block;
  color: rgb(204, 120, 50);
  border: 1px solid rgb(204, 120, 50);
  border-radius: 2px;
  font-size: 12px;
  padding: 0 2px;
  cursor: pointer;
  user-select: none;
`;
export function FlagEditor(props) {
    const keys = Object.keys(props.enum).filter(v => !/^\d+$/.test(v));
    const matchKeys = keys.filter(v => props.enum[v] & props.value);
    return (_jsxs(Layout, { children: [matchKeys.map(key => _jsx(Key, { children: key }, key)), _jsx(Add, { children: "Add" }, void 0)] }, void 0));
}
