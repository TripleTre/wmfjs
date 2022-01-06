import styled from "styled-components";
import React from "react";
import { EditConfig } from "../help";
import { EnumEditor } from "./EnumEditor";
import { NumberEditor } from "./NumberEditor";
import { ColorEditor } from "./ColorEditor";
import { PointEditor } from "./PointEditor";

const Layout = styled.div`

`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentItem = styled.div`
  display: flex;
  margin: 6px 0px;
`;

const Label = styled.div<{ l: number }>`
  color: rgb(186, 186, 186);
  width: ${props => props.l * 12}px;
  font-size: 15px;
`;

export interface ObjectEditorProps {
    value: any;
    config: { [ key: string ]: EditConfig };
}

export function ObjectEditor(props: ObjectEditorProps) {

    const keys = Object.keys(props.value || {}).filter(v => props.config[ v ]);
    const maxLength = Math.max(...keys.map(k => k.length));

    return (
        <Layout>
            <Content>
                {keys.map(key => {
                    let editor = null;
                    const config = props.config[ key ];
                    if (config.type === "enum") {
                        editor = React.createElement(EnumEditor, {
                            enum: config.enum,
                            value: props.value[ key ],
                            editable: false,
                        });
                    } else if (config.type === "number") {
                        editor = React.createElement(NumberEditor, {
                            value: props.value[ key ],
                            editable: false,
                        });
                    } else if (config.type === "object") {
                        editor = React.createElement(ObjectEditor, {
                            value: props.value[ key ],
                            // @ts-ignore
                            config: props.config[ key ].config,
                        });
                    } else if (config.type === "color") {
                        editor = React.createElement(ColorEditor, {
                            value: props.value[ key ],
                        });
                    } else if (config.type === "point") {
                        editor = React.createElement(PointEditor, {
                            value: props.value[ key ],
                        });
                    }

                    return (<ContentItem key={key}>
                        <Label l={maxLength}>{key}</Label>
                        {editor}
                    </ContentItem>);
                })}
            </Content>
        </Layout>
    )
}