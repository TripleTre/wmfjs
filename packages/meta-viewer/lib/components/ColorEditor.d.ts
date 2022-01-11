/// <reference types="react" />
interface ColorEditorProps {
    value: number;
    onChange?: (value: number) => void;
    editable?: boolean;
}
export declare function ColorEditor(props: ColorEditorProps): JSX.Element;
export {};
