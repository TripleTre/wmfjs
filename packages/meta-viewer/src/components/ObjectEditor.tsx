import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
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
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const EditorContainer = styled.div`
  flex: 1 1 auto;
`;

export interface ObjectEditorProps {
    value: any;
    config: { [ key: string ]: EditConfig };
    onChange?: (value: any) => void;
    editable?: boolean;
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

                    const commonProps = {
                        value: props.value[ key ],
                        editable: config.editable,
                        onChange: (value: any) => {
                            const next = {
                                ...props.value,
                                [key]: value,
                            };
                            if (props.onChange && props.editable) {
                                props.onChange(next);
                            }
                        }
                    };

                    if (config.type === "enum") {
                        editor = React.createElement(EnumEditor, {
                            enum: config.enum,
                            multi: config.multi,
                            ...commonProps,
                        });
                    } else if (config.type === "number") {
                        editor = React.createElement(NumberEditor, {
                            ...commonProps,
                        });
                    } else if (config.type === "object") {
                        editor = React.createElement(ObjectEditor, {
                            // @ts-ignore
                            config: props.config[ key ].config,
                            ...commonProps,
                        });
                    } else if (config.type === "color") {
                        editor = React.createElement(ColorEditor, {
                            ...commonProps,
                        });
                    } else if (config.type === "point") {
                        editor = React.createElement(PointEditor, {
                            ...commonProps,
                        });
                    }
                    return (<ContentItem key={key}>
                        <Label l={maxLength}>
                            <span>{key}</span>
                        </Label>
                        <EditorContainer>
                            {editor}
                        </EditorContainer>
                    </ContentItem>);
                })}
            </Content>
        </Layout>
    )
}