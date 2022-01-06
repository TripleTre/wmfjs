import { FormEvent, useCallback } from "react";

interface NumberEditorProps {
    value: number;
    editable: boolean;
    onChange?: (value: number) => void;
}

export function NumberEditor(props: NumberEditorProps) {

    const changeHandler = useCallback((evt: FormEvent<HTMLInputElement>) => {

    }, []);

    return (
        <input type={"number"} value={props.value} onChange={changeHandler} />
    )
}