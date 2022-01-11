import { BinaryRasterOperation, BrushStyle, HatchStyle, MapMode, MixMode, PenStyle, PolyFillMode, TextAlign } from "@wmfjs/core";
import { MultiNumberEditor } from "./components/MultiNumberEditor";
import { EnumEditor } from "./components/EnumEditor";
import { ColorEditor } from "./components/ColorEditor";
import { NumberEditor } from "./components/NumberEditor";
import { ObjectEditor } from "./components/ObjectEditor";
import { MultiPointEditor } from "./components/MultiPointEditor";
const BYTE_PER_WORD = 2;
export const META_SETWINDOWEXT = {
    component: MultiNumberEditor,
    props: (record) => ({
        value: record.payload,
        editable: true,
    }),
    toBuffer: (record) => {
        const buf = new ArrayBuffer(10);
        const dataView = new DataView(buf, 0, 10);
        dataView.setUint32(0, 10 / BYTE_PER_WORD);
    }
};
export const META_SETWINDOWORG = META_SETWINDOWEXT;
export const META_SETMAPMODE = {
    component: EnumEditor,
    props: (record) => ({
        enum: MapMode,
        value: record.payload,
        editable: true,
    }),
};
export const META_SETBKMODE = {
    component: EnumEditor,
    props: (record) => ({
        enum: MixMode,
        value: record.payload,
        editable: true,
    }),
};
export const META_SETPOLYFILLMODE = {
    component: EnumEditor,
    props: (record) => ({
        enum: PolyFillMode,
        value: record.payload,
        editable: true,
    }),
};
export const META_SETTEXTALIGN = {
    component: EnumEditor,
    props: (record) => ({
        enum: TextAlign,
        value: record.payload,
        editable: true,
        multi: true,
    }),
};
export const META_SETTEXTCOLOR = {
    component: ColorEditor,
    props: (record) => ({
        value: record.payload,
        editable: true,
    }),
};
export const META_SETROP2 = {
    component: EnumEditor,
    props: (record) => ({
        enum: BinaryRasterOperation,
        value: record.payload,
        editable: true,
    }),
};
export const META_ESCAPE_SETMITERLIMIT = {
    component: NumberEditor,
    props: (record) => ({
        value: record.payload.escapePayload,
        editable: true,
    }),
};
export const META_CREATEPENINDIRECT = {
    component: ObjectEditor,
    props: (record) => ({
        editable: true,
        value: record.payload,
        config: {
            color: { type: "color", editable: true },
            width: { type: "point", editable: true },
            style: { type: "enum", enum: PenStyle, multi: true, editable: true }
        }
    }),
};
export const META_SELECTOBJECT = {
    component: NumberEditor,
    props: (record) => ({
        value: record.payload,
        editable: true,
    }),
};
export const META_DELETEOBJECT = META_SELECTOBJECT;
export const META_POLYGON = {
    component: MultiPointEditor,
    props: (record) => ({
        value: record.payload,
    }),
};
export const META_CREATEBRUSHINDIRECT = {
    component: ObjectEditor,
    props: (record) => ({
        value: record.payload,
        editable: true,
        config: {
            color: { type: "color", editable: true },
            style: { type: "enum", enum: BrushStyle, editable: true },
            hatch: { type: "enum", enum: HatchStyle, editable: true },
        }
    }),
};
