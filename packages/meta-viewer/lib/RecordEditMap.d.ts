import { BinaryRasterOperation, BrushStyle, HatchStyle, MapMode, MixMode, PenStyle, PolyFillMode, TextAlign } from "@wmfjs/core";
import { MultiNumberEditor } from "./components/MultiNumberEditor";
import { EnumEditor } from "./components/EnumEditor";
import { ColorEditor } from "./components/ColorEditor";
import { NumberEditor } from "./components/NumberEditor";
import { ObjectEditor } from "./components/ObjectEditor";
import { MultiPointEditor } from "./components/MultiPointEditor";
export declare const META_SETWINDOWEXT: {
    component: typeof MultiNumberEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
    toBuffer: (record: RecordItem) => void;
};
export declare const META_SETWINDOWORG: {
    component: typeof MultiNumberEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
    toBuffer: (record: RecordItem) => void;
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
    component: typeof EnumEditor;
    props: (record: RecordItem) => {
        enum: typeof TextAlign;
        value: any;
        editable: boolean;
        multi: boolean;
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
        editable: boolean;
    };
};
export declare const META_CREATEPENINDIRECT: {
    component: typeof ObjectEditor;
    props: (record: RecordItem) => {
        editable: boolean;
        value: any;
        config: {
            color: {
                type: string;
                editable: boolean;
            };
            width: {
                type: string;
                editable: boolean;
            };
            style: {
                type: string;
                enum: typeof PenStyle;
                multi: boolean;
                editable: boolean;
            };
        };
    };
};
export declare const META_SELECTOBJECT: {
    component: typeof NumberEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
};
export declare const META_DELETEOBJECT: {
    component: typeof NumberEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
    };
};
export declare const META_POLYGON: {
    component: typeof MultiPointEditor;
    props: (record: RecordItem) => {
        value: any;
    };
};
export declare const META_CREATEBRUSHINDIRECT: {
    component: typeof ObjectEditor;
    props: (record: RecordItem) => {
        value: any;
        editable: boolean;
        config: {
            color: {
                type: string;
                editable: boolean;
            };
            style: {
                type: string;
                enum: typeof BrushStyle;
                editable: boolean;
            };
            hatch: {
                type: string;
                enum: typeof HatchStyle;
                editable: boolean;
            };
        };
    };
};
