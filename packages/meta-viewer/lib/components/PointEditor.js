import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { useCallback } from "react";
const Layout = styled.div `
  display: flex;
`;
const Input = styled.input `
  height: 22px;
  outline: none;
  background: rgb(50, 50, 50);
  color: #fff;
  text-align: center;
  width: 60px;
  border-radius: 0 4px 4px 0;
  border: 1px solid rgb(186,186,186);
`;
const Label = styled.div `
  background: rgb(186,186,186);
  width: 18px;
  text-align: center;
  border-radius: 4px 0 0 4px;
  color: #000000d1;
  & > span {
    vertical-align: 4px;
  }
`;
const Link = styled.span `
  margin: 0 4px;
  color: rgb(186,186,186);
`;
export function PointEditor(props) {
    const changeHandler = useCallback((type, evt) => {
        if (props.editable && props.onChange) {
            props.onChange(Object.assign(Object.assign({}, props.value), { [type]: evt.target.value }));
        }
    }, []);
    return (_jsxs(Layout, { children: [_jsx(Label, { children: _jsx("span", { children: "x" }, void 0) }, void 0), _jsx(Input, { onChange: (evt) => changeHandler("x", evt), value: props.value.x }, void 0), _jsx(Link, { children: "-" }, void 0), _jsx(Label, { children: _jsx("span", { children: "y" }, void 0) }, void 0), _jsx(Input, { onChange: (evt) => changeHandler("y", evt), value: props.value.y }, void 0)] }, void 0));
}
