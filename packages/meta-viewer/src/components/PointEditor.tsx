import { PointS } from "@wmfjs/core";
import styled from "styled-components";

const Layout = styled.div`
`;

const Input = styled.input`
  height: 22px;
`;

const Label = styled.span`
  line-height: 28px;
  background: red;
  display: inline-block;
  vertical-align: bottom;
`;

interface PointEditorProps {
    value: PointS
}

export function PointEditor(props: PointEditorProps) {
    return (
        <Layout>
            <Label>x:</Label><Input value={props.value.x}/>
        </Layout>
    )
}
