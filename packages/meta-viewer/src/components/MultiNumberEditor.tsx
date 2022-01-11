import styled from "styled-components";
import { useCallback } from "react";
import { NumberEditor } from "./NumberEditor";

interface MultiNumberEditorProps {
    value: number[];
    editable: boolean;
    onChange?: (value: number[]) => void;
    limit?: [number, number];
}

const Layout = styled.div`
  & input:first-child {
    margin-left: 0;
  }
  & input:last-child {
    margin-right: 0;
  }
  & input {
    margin: 0 6px;
  }
`;

export function MultiNumberEditor(props: MultiNumberEditorProps) {

    const changeHandler = useCallback((index: number, value: number) => {
        if (props.onChange && props.editable) {
            const next = props.value.concat([]);
            next[index] = value;
            props.onChange(next);
        }
    }, [props.onChange, props.editable, props.value]);

    return (
        <Layout>
            {props.value.map((v, i) => <NumberEditor limit={props.limit} editable={props.editable} key={i} value={v}
                                                     onChange={(value: number) => changeHandler(i, value)}/>)}
        </Layout>
    )
}
