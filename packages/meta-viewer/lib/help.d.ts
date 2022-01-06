export declare type EditType = "number" | "string" | "enum";
export declare type Editable = {
    editable: boolean;
};
export declare type LiteralConfig = {
    type: "number" | "string" | "color" | "point";
};
export declare type EnumConfig = {
    type: "enum";
    enum: any;
};
export declare type ObjectConfig = {
    type: "object";
    config: {
        [key: string]: EditConfig;
    };
};
export declare type EditConfig = (LiteralConfig | EnumConfig | ObjectConfig) & Editable;
export declare function editAttrToString(name: any, value: string, config?: EditConfig): string;
