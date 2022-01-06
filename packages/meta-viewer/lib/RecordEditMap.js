import { BinaryRasterOperation, MapMode, MixMode, PolyFillMode, TextAlign } from "@wmfjs/core";
import { MultiNumberEditor } from "./components/MultiNumberEditor";
import { EnumEditor } from "./components/EnumEditor";
import { FlagEditor } from "./components/FlagEditor";
import { ColorEditor } from "./components/ColorEditor";
import { NumberEditor } from "./components/NumberEditor";
import { ObjectEditor } from "./components/ObjectEditor";
export const META_SETWINDOWEXT = {
    component: MultiNumberEditor,
    props: (record) => ({
        value: record.payload,
        editable: false,
    }),
};
export const META_SETWINDOWORG = META_SETWINDOWEXT;
export const META_SETMAPMODE = {
    component: EnumEditor,
    props: (record) => ({
        enum: MapMode,
        value: record.payload[0],
        editable: false,
    }),
};
export const META_SETBKMODE = {
    component: EnumEditor,
    props: (record) => ({
        enum: MixMode,
        value: record.payload[0],
        editable: false,
    }),
};
export const META_SETPOLYFILLMODE = {
    component: EnumEditor,
    props: (record) => ({
        enum: PolyFillMode,
        value: record.payload[0],
        editable: false,
    }),
};
export const META_SETTEXTALIGN = {
    component: FlagEditor,
    props: (record) => ({
        enum: TextAlign,
        value: record.payload[0],
        editable: false,
    }),
};
export const META_SETTEXTCOLOR = {
    component: ColorEditor,
    props: (record) => ({
        value: record.payload[0],
        editable: false,
    }),
};
export const META_SETROP2 = {
    component: EnumEditor,
    props: (record) => ({
        enum: BinaryRasterOperation,
        value: record.payload[0],
        editable: false,
    }),
};
export const META_ESCAPE_SETMITERLIMIT = {
    component: NumberEditor,
    props: (record) => ({
        value: record.payload.escapePayload,
    }),
};
export const META_CREATEPENINDIRECT = {
    component: ObjectEditor,
    props: (record) => ({
        value: record.payload[0],
        config: {
            color: { type: "color" },
            width: { type: "point" },
        }
    }),
};
