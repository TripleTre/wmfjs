import "reflect-metadata";
export const SERIALIZE_KEY = {
    order: Symbol("serialize:order"),
    type: Symbol("serialize:type"),
};
export function serialize(type) {
    return function serialize(target, propertyKey) {
        let order = Reflect.getMetadata(SERIALIZE_KEY.order, target);
        if (order === undefined) {
            order = -1;
        }
        order += 1;
        Reflect.defineMetadata(SERIALIZE_KEY.order, order, target);
        Reflect.defineMetadata(SERIALIZE_KEY.order, order, target, propertyKey);
        const _type = type || Reflect.getMetadata("design:type", target, propertyKey);
        Reflect.defineMetadata(SERIALIZE_KEY.type, _type, target, propertyKey);
        const _order = Reflect.getMetadata(SERIALIZE_KEY.order, target, propertyKey);
        console.log(propertyKey, _type, _order);
    };
}
