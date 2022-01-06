import { BinaryRasterOperation, MapMode, MixMode, PolyFillMode, RecordItem, TextAlign } from "@wmfjs/core";
import { MultiNumberEditor } from "./components/MultiNumberEditor";
import { EnumEditor } from "./components/EnumEditor";
import { FlagEditor } from "./components/FlagEditor";
import { ColorEditor } from "./components/ColorEditor";
import { NumberEditor } from "./components/NumberEditor";
import { ObjectEditor } from "./components/ObjectEditor";
export declare const META_SETWINDOWEXT: {
    component: typeof MultiNumberEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
};
export declare const META_SETWINDOWORG: {
    component: typeof MultiNumberEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
};
export declare const META_SETMAPMODE: {
    component: typeof EnumEditor;
    props: (record: RecordItem) => {
        enum: typeof MapMode;
        value: any;
        editable: boolean;
    };
};
export declare const META_SETBKMODE: {
    component: typeof EnumEditor;
    props: (record: RecordItem) => {
        enum: typeof MixMode;
        value: any;
        editable: boolean;
    };
};
export declare const META_SETPOLYFILLMODE: {
    component: typeof EnumEditor;
    props: (record: RecordItem) => {
        enum: typeof PolyFillMode;
        value: any;
        editable: boolean;
    };
};
export declare const META_SETTEXTALIGN: {
    component: typeof FlagEditor;
    props: (record: RecordItem) => {
        enum: typeof TextAlign;
        value: any;
        editable: boolean;
    };
};
export declare const META_SETTEXTCOLOR: {
    component: typeof ColorEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
};
export declare const META_SETROP2: {
    component: typeof EnumEditor;
    props: (record: RecordItem) => {
        enum: typeof BinaryRasterOperation;
        value: any;
        editable: boolean;
    };
};
export declare const META_ESCAPE_SETMITERLIMIT: {
    component: typeof NumberEditor;
    props: (record: RecordItem) => {
        value: any;
    };
};
export declare const META_CREATEPENINDIRECT: {
    component: typeof ObjectEditor;
    props: (record: RecordItem) => {
        value: any;
        config: {
            color: {
                type: string;
            };
            width: {
                type: string;
            };
        };
    };
};
