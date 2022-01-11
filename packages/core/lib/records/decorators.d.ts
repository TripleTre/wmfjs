import "reflect-metadata";
export declare const SERIALIZE_KEY: {
    order: symbol;
    type: symbol;
};
export declare type LiteralType = "int8" | "int16" | "uint32" | "uint16";
export declare function serialize(type?: LiteralType): PropertyDecorator;
