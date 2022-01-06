/// <reference types="react" />
interface EnumEditorProps {
    enum: any;
    value: number;
    editable: boolean;
    onChange?: (value: number) => void;
}
export declare function EnumEditor(props: EnumEditorProps): JSX.Element;
export {};
