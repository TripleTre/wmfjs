import { NumberEditor } from "./components/NumberEditor";
import { RecordItem, RecordType } from "@wmfjs/core";
import * as React from "react";
import { MultiNumberEditor } from "./components/MultiNumberEditor";
import { records } from "@wmfjs/core/lib/records/records";

export type EditType = "number" | "string" | "enum";

export type Editable = { editable: boolean };
export type LiteralConfig = { type: "number" | "string" | "color" | "point" };
export type EnumConfig = { type: "enum", enum: any };
export type ObjectConfig = { type: "object", config: { [ key: string ]: EditConfig } };

export type EditConfig = (LiteralConfig | EnumConfig | ObjectConfig) & Editable;

export function editAttrToString(name: any, value: string, config?: EditConfig) {
    if (config?.type === "enum") {
        return `${name}=${config.enum[value]}`;
    } else {
        return `${name}=${value.toString()}`;
    }
}
