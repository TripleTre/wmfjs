/// <reference types="react" />
interface NumberEditorProps {
    value: number;
    editable: boolean;
    onChange?: (value: number) => void;
}
export declare function NumberEditor(props: NumberEditorProps): JSX.Element;
export {};
