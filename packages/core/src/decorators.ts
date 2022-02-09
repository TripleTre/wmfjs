import { Serializable } from "./Serializable";

export const SERIALIZE_KEY = {
    order: Symbol("serialize:order"),
    type: Symbol("serialize:type"),
    keys: Symbol("serialize:keys"),
    optional: Symbol("serialize:optional"),
    align: Symbol("serialize:align"),
};

export enum LiteralType {
    int8 = 1,
    uint8,
    int16,
    uint16,
    uint32,
    int32,
};

export interface CollectionType {
    collection: typeof Array | typeof Map | typeof Set;
    element: (typeof Serializable) | LiteralType;
};

export interface StringType {
    characters: string;
    nullTerminated: boolean;
    byteLength: number;
};

export interface ArrayBufferType {
    type: "ArrayBuffer";
    byteLength: ((_this: any) => number) | number;
    align?: boolean;
};

export function isLiteralType(t: any): t is keyof typeof LiteralType {
    return !!(LiteralType[t]);
}

export function isArrayType(t: any): t is CollectionType {
    return t.collection === Array && t.element;
}

export function isStringType(t: any): t is StringType {
    return t.characters && t.nullTerminated;
}

export function isArrayBufferType(t: any): t is ArrayBufferType {
    return t.type === "ArrayBuffer";
}

export function isSerializeable(t: any): t is Serializable {
    return !!t.serializable;
}

export function optional(indicate?: (_this: any) => boolean): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(SERIALIZE_KEY.optional, indicate || "remaining", target, propertyKey);
    };
}

export function align(target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(SERIALIZE_KEY.align, true, target, propertyKey);
}

export function serialize(type?: LiteralType | CollectionType | StringType | ArrayBufferType): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, target) || [];
        keys.push(propertyKey);
        Reflect.defineMetadata(SERIALIZE_KEY.keys, keys, target);

        let order = Reflect.getMetadata(SERIALIZE_KEY.order, target);
        if (order === undefined) {
            order = -1;
        }
        order += 1;
        Reflect.defineMetadata(SERIALIZE_KEY.order, order, target);
        Reflect.defineMetadata(SERIALIZE_KEY.order, order, target, propertyKey);
        const _type = type || Reflect.getMetadata("design:type", target, propertyKey);
        Reflect.defineMetadata(SERIALIZE_KEY.type, _type, target, propertyKey);
        // const _order = Reflect.getMetadata(SERIALIZE_KEY.order, target, propertyKey);
        // console.log(propertyKey, _type, _order);
    };
}

export function readonly(target: Object, propertyKey: string | symbol, descriptor: any) {
    descriptor.set = () => {};
}
