import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import React from "react";
import { EnumEditor } from "./EnumEditor";
import { NumberEditor } from "./NumberEditor";
import { ColorEditor } from "./ColorEditor";
import { PointEditor } from "./PointEditor";
const Layout = styled.div `

`;
const Content = styled.div `
  display: flex;
  flex-direction: column;
`;
const ContentItem = styled.div `
  display: flex;
  margin: 6px 0px;
`;
const Label = styled.div `
  color: rgb(186, 186, 186);
  width: ${props => props.l * 12}px;
  font-size: 15px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;
const EditorContainer = styled.div `
  flex: 1 1 auto;
`;
export function ObjectEditor(props) {
    const keys = Object.keys(props.value || {}).filter(v => props.config[v]);
    const maxLength = Math.max(...keys.map(k => k.length));
    return (_jsx(Layout, { children: _jsx(Content, { children: keys.map(key => {
                let editor = null;
                const config = props.config[key];
                const commonProps = {
                    value: props.value[key],
                    editable: config.editable,
                    onChange: (value) => {
                        const next = Object.assign(Object.assign({}, props.value), { [key]: value });
                        if (props.onChange && props.editable) {
                            props.onChange(next);
                        }
                    }
                };
                if (config.type === "enum") {
                    editor = React.createElement(EnumEditor, Object.assign({ enum: config.enum, multi: config.multi }, commonProps));
                }
                else if (config.type === "number") {
                    editor = React.createElement(NumberEditor, Object.assign({}, commonProps));
                }
                else if (config.type === "object") {
                    editor = React.createElement(ObjectEditor, Object.assign({ 
                        // @ts-ignore
                        config: props.config[key].config }, commonProps));
                }
                else if (config.type === "color") {
                    editor = React.createElement(ColorEditor, Object.assign({}, commonProps));
                }
                else if (config.type === "point") {
                    editor = React.createElement(PointEditor, Object.assign({}, commonProps));
                }
                return (_jsxs(ContentItem, { children: [_jsx(Label, Object.assign({ l: maxLength }, { children: _jsx("span", { children: key }, void 0) }), void 0), _jsx(EditorContainer, { children: editor }, void 0)] }, key));
            }) }, void 0) }, void 0));
}
