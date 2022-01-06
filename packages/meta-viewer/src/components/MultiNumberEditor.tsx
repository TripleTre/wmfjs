import styled from "styled-components";
import { useCallback } from "react";

interface MultiNumberEditorProps {
    value: number[];
    editable: boolean;
    onChange?: (value: number[]) => void;
}

const Layout = styled.div`
`;

export function MultiNumberEditor(props: MultiNumberEditorProps) {

    const changeHandler = useCallback(() => {

    }, []);

    return (
        <Layout>
            {props.value.map((v, i) => <input key={i} type={"number"} value={v} onChange={changeHandler} />)}
        </Layout>
    )
}
