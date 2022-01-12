"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializableEscape = exports.SerializableRecord = exports.Serializable = exports.bufferToLiteral = exports.literalToBuffer = exports.literalByteLength = exports.BYTE_PER_WORD = void 0;
const decorators_1 = require("./decorators");
const enums_1 = require("./enums");
exports.BYTE_PER_WORD = 2;
exports.literalByteLength = {
    int8: 1,
    uint8: 1,
    int16: 2,
    uint16: 2,
    uint32: 4,
};
exports.literalToBuffer = {
    int8: (view, offset, value) => {
        return view.setInt8(offset, value);
    },
    uint8: (view, offset, value) => {
        return view.setUint8(offset, value);
    },
    int16: (view, offset, value) => {
        return view.setInt16(offset, value, true);
    },
    uint16: (view, offset, value) => {
        return view.setUint16(offset, value, true);
    },
    uint32: (view, offset, value) => {
        return view.setUint32(offset, value, true);
    },
};
exports.bufferToLiteral = {
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
class Serializable {
    deserialize(buf) {
        const _this = this;
        const view = new DataView(buf);
        const keys = Reflect.getMetadata(decorators_1.SERIALIZE_KEY.keys, this);
        let offset = 0;
        for (const key of keys) {
            const type = Reflect.getMetadata(decorators_1.SERIALIZE_KEY.type, this, key);
            let value;
            if ((0, decorators_1.isLiteralType)(type)) {
                value = exports.bufferToLiteral[decorators_1.LiteralType[type]](view, offset);
                offset += exports.literalByteLength[decorators_1.LiteralType[type]];
                _this[key] = value;
            }
            else if ((0, decorators_1.isArrayType)(type)) {
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
        const _this = this;
        const buffer = new Uint8Array(this.byteSize);
        const view = new DataView(buffer.buffer);
        const keys = Reflect.getMetadata(decorators_1.SERIALIZE_KEY.keys, this);
        let offset = 0;
        for (const key of keys) {
            const type = Reflect.getMetadata(decorators_1.SERIALIZE_KEY.type, this, key);
            if ((0, decorators_1.isLiteralType)(type)) {
                exports.literalToBuffer[decorators_1.LiteralType[type]](view, offset, _this[key]);
                offset += exports.literalByteLength[decorators_1.LiteralType[type]];
            }
            else if ((0, decorators_1.isArrayType)(type)) {
                for (const element of _this[key]) {
                    const buf = element.serialize();
                    const uint8Buf = new Uint8Array(buf);
                    buffer.set(uint8Buf, offset);
                    offset += element.byteSize;
                }
            }
            else if (type === ArrayBuffer) {
                const uint8Buf = new Uint8Array(_this[key]);
                buffer.set(uint8Buf, offset);
                offset += _this[key].byteLength;
            }
            else {
                const buf = _this[key].serialize();
                const uint8Buf = new Uint8Array(buf);
                buffer.set(uint8Buf, offset);
                offset += _this[key].byteSize;
            }
        }
        if (_this.recordFunction === enums_1.RecordType.META_ESCAPE && _this.escape) {
            const escapeBuf = new Uint8Array(_this.escape.serialize());
            buffer.set(escapeBuf, offset);
        }
        return buffer.buffer;
    }
}
exports.Serializable = Serializable;
class SerializableRecord extends Serializable {
    get byteSize() {
        return this.recordSize * exports.BYTE_PER_WORD;
    }
}
exports.SerializableRecord = SerializableRecord;
class SerializableEscape extends Serializable {
    get byteSize() {
        return 2 + 2 + this.escapeData.byteLength;
    }
}
exports.SerializableEscape = SerializableEscape;
