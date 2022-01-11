/// <reference types="react" />
interface NumberEditorProps {
    value: number;
    editable: boolean;
    onChange?: (value: number) => void;
    limit?: [number, number];
}
export declare function NumberEditor(props: NumberEditorProps): JSX.Element;
export {};
