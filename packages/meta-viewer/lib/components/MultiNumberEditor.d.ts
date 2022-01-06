/// <reference types="react" />
interface MultiNumberEditorProps {
    value: number[];
    editable: boolean;
    onChange?: (value: number[]) => void;
}
export declare function MultiNumberEditor(props: MultiNumberEditorProps): JSX.Element;
export {};
