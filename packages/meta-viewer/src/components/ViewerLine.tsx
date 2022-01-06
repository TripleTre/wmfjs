import React, { ReactNode } from "react";
import styled from "styled-components";
import { Header } from "./Header";

interface ViewerLineProps {
    header: string;
    offset: number;
    subHeader?: string;
    children?: ReactNode | undefined;
}

const LineLayout = styled.div`
`;

const Content = styled.div`
    padding: 6px 22px;
`;

export function ViewerLine(props: ViewerLineProps) {
    return (
        <LineLayout>
            <Header subTitle={props.subHeader} title={props.header} offset={props.offset}/>
            <Content>{props.children}</Content>
        </LineLayout>
    )
}