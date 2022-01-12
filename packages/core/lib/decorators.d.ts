import { Serializable } from "./Serializable";
export declare const SERIALIZE_KEY: {
    order: symbol;
    type: symbol;
    keys: symbol;
};
export declare enum LiteralType {
    int8 = 0,
    uint8 = 1,
    int16 = 2,
    uint16 = 3,
    uint32 = 4
}
export interface CollectionType {
    collection: typeof Array | typeof Map | typeof Set;
    element: typeof Serializable;
}
export declare function isLiteralType(t: any): t is keyof typeof LiteralType;
export declare function isArrayType(t: any): t is CollectionType;
export declare function serialize(type?: LiteralType | CollectionType): PropertyDecorator;
export declare function readonly(target: Object, propertyKey: string | symbol, descriptor: any): void;
