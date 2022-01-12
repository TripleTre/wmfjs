"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readonly = exports.serialize = exports.isArrayType = exports.isLiteralType = exports.LiteralType = exports.SERIALIZE_KEY = void 0;
exports.SERIALIZE_KEY = {
    order: Symbol("serialize:order"),
    type: Symbol("serialize:type"),
    keys: Symbol("serialize:keys"),
};
var LiteralType;
(function (LiteralType) {
    LiteralType[LiteralType["int8"] = 0] = "int8";
    LiteralType[LiteralType["uint8"] = 1] = "uint8";
    LiteralType[LiteralType["int16"] = 2] = "int16";
    LiteralType[LiteralType["uint16"] = 3] = "uint16";
    LiteralType[LiteralType["uint32"] = 4] = "uint32";
})(LiteralType = exports.LiteralType || (exports.LiteralType = {}));
;
;
function isLiteralType(t) {
    return !!(LiteralType[t]);
}
exports.isLiteralType = isLiteralType;
function isArrayType(t) {
    return t.collection === Array && t.element;
}
exports.isArrayType = isArrayType;
function serialize(type) {
    return function (target, propertyKey) {
        const keys = Reflect.getMetadata(exports.SERIALIZE_KEY.keys, target) || [];
        keys.push(propertyKey);
        Reflect.defineMetadata(exports.SERIALIZE_KEY.keys, keys, target);
        let order = Reflect.getMetadata(exports.SERIALIZE_KEY.order, target);
        if (order === undefined) {
            order = -1;
        }
        order += 1;
        Reflect.defineMetadata(exports.SERIALIZE_KEY.order, order, target);
        Reflect.defineMetadata(exports.SERIALIZE_KEY.order, order, target, propertyKey);
        const _type = type || Reflect.getMetadata("design:type", target, propertyKey);
        Reflect.defineMetadata(exports.SERIALIZE_KEY.type, _type, target, propertyKey);
        // const _order = Reflect.getMetadata(SERIALIZE_KEY.order, target, propertyKey);
        // console.log(propertyKey, _type, _order);
    };
}
exports.serialize = serialize;
function readonly(target, propertyKey, descriptor) {
    descriptor.set = () => { };
}
exports.readonly = readonly;
