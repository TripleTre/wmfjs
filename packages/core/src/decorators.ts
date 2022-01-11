import { Serializable } from "./Serializable";

export const SERIALIZE_KEY = {
    order: Symbol("serialize:order"),
    type: Symbol("serialize:type"),
    keys: Symbol("serialize:keys"),
};

export enum LiteralType {
    int8,
    uint8,
    int16,
    uint16,
    uint32,
};

export interface CollectionType {
    collection: typeof Array | typeof Map | typeof Set;
    element: typeof Serializable;
};

export function isLiteralType(t: any): t is keyof typeof LiteralType {
    return !!(LiteralType[t]);
}

export function isArrayType(t: any): t is CollectionType {
    return t.collection === Array && t.element;
}

export function serialize(type?: LiteralType | CollectionType): PropertyDecorator {
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
    }
}
