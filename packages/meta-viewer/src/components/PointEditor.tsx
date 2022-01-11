import { PointS } from "@wmfjs/core";
import styled from "styled-components";
import { ChangeEvent, useCallback } from "react";

const Layout = styled.div`
  display: flex;
`;

const Input = styled.input`
  height: 22px;
  outline: none;
  background: rgb(50, 50, 50);
  color: #fff;
  text-align: center;
  width: 60px;
  border-radius: 0 4px 4px 0;
  border: 1px solid rgb(186,186,186);
`;

const Label = styled.div`
  background: rgb(186,186,186);
  width: 18px;
  text-align: center;
  border-radius: 4px 0 0 4px;
  color: #000000d1;
  & > span {
    vertical-align: 4px;
  }
`;

const Link = styled.span`
  margin: 0 4px;
  color: rgb(186,186,186);
`;

interface PointEditorProps {
    value: PointS;
    onChange?: (value: PointS) => void;
    editable?: boolean;
}

export function PointEditor(props: PointEditorProps) {

    const changeHandler = useCallback((type: "x" | "y", evt: ChangeEvent<HTMLInputElement>) => {
        if (props.editable && props.onChange) {
            props.onChange({
                ...props.value,
                [type]: evt.target.value,
            });
        }
    }, []);

    return (
        <Layout>
            <Label><span>x</span></Label>
            <Input onChange={(evt) => changeHandler("x", evt)} value={props.value.x}/>
            <Link>-</Link>
            <Label><span>y</span></Label>
            <Input onChange={(evt) => changeHandler("y", evt)} value={props.value.y}/>
        </Layout>
    )
}
