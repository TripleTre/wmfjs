import styled from "styled-components";
import { PointS } from "@wmfjs/core";
import { PointEditor } from "./PointEditor";

interface MultiPointEditorProps {
    value: PointS[];
}

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const No = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 18px 2px 0px;
`;

const Label = styled.div`
  color: rgb(186,186,186);
`;

export function MultiPointEditor(props: MultiPointEditorProps) {

    return (
        <Layout>
            {props.value.map((point, index) => (
                <No key={index}>
                    <Label style={{width: `${props.value.length.toString().length * 12}px`}}>{index}</Label>
                    <PointEditor key={index} value={point}/>
                </No>
            ))}
        </Layout>
    );
}
