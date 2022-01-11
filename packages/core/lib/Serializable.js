import { isArrayType, isLiteralType, LiteralType, SERIALIZE_KEY } from "./decorators";
export const literalByteLength = {
    int8: 1,
    uint8: 1,
    int16: 2,
    uint16: 2,
    uint32: 4,
};
export const literalTransform = {
    int8: (view, offset) => {
        return view.getInt8(offset);
    },
    uint8: (view, offset) => {
        return view.getUint8(offset);
    },
    int16: (view, offset) => {
        return view.getInt16(offset, true);
    },
    uint16: (view, offset) => {
        return view.getUint16(offset, true);
    },
    uint32: (view, offset) => {
        return view.getUint32(offset, true);
    },
};
export class Serializable {
    deserialize(buf) {
        const _this = this;
        const view = new DataView(buf);
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, this);
        let offset = 0;
        for (const key of keys) {
            const type = Reflect.getMetadata(SERIALIZE_KEY.type, this, key);
            let value;
            if (isLiteralType(type)) {
                value = literalTransform[LiteralType[type]](view, offset);
                offset += literalByteLength[LiteralType[type]];
                _this[key] = value;
            }
            else if (isArrayType(type)) {
                for (const element of _this[key]) {
                    element.deserialize(buf.slice(offset));
                    offset += element.byteSize;
                }
            }
            else if (type === ArrayBuffer) {
                _this[key] = buf.slice(offset);
            }
            else {
                value = new type();
                value.deserialize(buf.slice(offset));
                offset += value.byteSize;
                _this[key] = value;
            }
        }
    }
    serialize() {
    }
}
export class SerializableRecord extends Serializable {
    get byteSize() {
        return this.recordSize;
    }
}
export class SerializableEscape extends Serializable {
    get byteSize() {
        return 2 + 2 + this.escapeData.byteLength;
    }
}
