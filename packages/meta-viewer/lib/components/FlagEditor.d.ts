/// <reference types="react" />
interface FlagEditorProps {
    enum: any;
    value: number;
    onChange: (value: number) => void;
}
export declare function FlagEditor(props: FlagEditorProps): JSX.Element;
export {};
