/// <reference types="react" />
interface EnumEditorProps {
    enum: any;
    value: number;
    editable: boolean;
    multi?: boolean;
    onChange?: (value: number) => void;
}
export declare function EnumEditor(props: EnumEditorProps): JSX.Element;
export {};
