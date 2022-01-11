/// <reference types="react" />
import { PointS } from "@wmfjs/core";
interface PointEditorProps {
    value: PointS;
    onChange?: (value: PointS) => void;
    editable?: boolean;
}
export declare function PointEditor(props: PointEditorProps): JSX.Element;
export {};
