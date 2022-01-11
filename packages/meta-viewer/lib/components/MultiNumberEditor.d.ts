/// <reference types="react" />
interface MultiNumberEditorProps {
    value: number[];
    editable: boolean;
    onChange?: (value: number[]) => void;
    limit?: [number, number];
}
export declare function MultiNumberEditor(props: MultiNumberEditorProps): JSX.Element;
export {};
