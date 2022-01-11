import { ChangeEvent, FormEvent, useCallback } from "react";
import styled from "styled-components";

interface NumberEditorProps {
    value: number;
    editable: boolean;
    onChange?: (value: number) => void;
    limit?: [number, number];
}

const Input = styled.input`
  outline: none;
  background: rgb(50, 50, 50);
  border: 1px solid rgb(186,186,186);
  height: 22px;
  outline: none;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  width: 146px;
  &:focus {
    border-color: #fff;
    box-shadow: 0px 0px 0px 1px #fff;
  }
`;

export function NumberEditor(props: NumberEditorProps) {
    const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        let v = Number(evt.target.value);
        if (!Number.isNaN(v) && props.onChange && props.editable) {
            if (props.limit) {
                v = Math.max(props.limit[0], v);
                v = Math.min(props.limit[1], v);
            }
            props.onChange(v);
        }
    }, [props.onChange, props.editable]);

    return (
        <Input value={props.value} onChange={changeHandler}/>
    )
}