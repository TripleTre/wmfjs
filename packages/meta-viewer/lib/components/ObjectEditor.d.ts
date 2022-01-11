/// <reference types="react" />
import { EditConfig } from "../help";
export interface ObjectEditorProps {
    value: any;
    config: {
        [key: string]: EditConfig;
    };
    onChange?: (value: any) => void;
    editable?: boolean;
}
export declare function ObjectEditor(props: ObjectEditorProps): JSX.Element;
