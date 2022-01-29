import { Buffer } from "buffer"
import { decode, encode } from "iconv-lite";
import {
    isArrayBufferType,
    isArrayType,
    isLiteralType,
    isSerializeable,
    isStringType,
    LiteralType,
    SERIALIZE_KEY
} from "./decorators";
import { MetafileEscapes, RecordType } from "./enums";

export const BYTE_PER_WORD = 2;
export const BYTE_PER_CHAR = 4;

export const literalByteLength: {
    [key in keyof typeof LiteralType]: number
} = {
    int8: 1,
    uint8: 1,
    int16: 2,
    uint16: 2,
    uint32: 4
}

export const literalToBuffer: {
    [key in keyof typeof LiteralType]: (view: DataView, offset: number, value: number) => void
} = {
    int8: (view: DataView, offset: number, value: number) => {
        return view.setInt8(offset, value);
    },
    uint8: (view: DataView, offset: number, value: number) => {
        return view.setUint8(offset, value);
    },
    int16: (view: DataView, offset: number, value: number) => {
        return view.setInt16(offset, value, true);
    },
    uint16: (view: DataView, offset: number, value: number) => {
        return view.setUint16(offset, value,true);
    },
    uint32: (view: DataView, offset: number, value: number) => {
        return view.setUint32(offset, value, true);
    },
}

export const bufferToLiteral: {
    [key in keyof typeof LiteralType]: (view: DataView, offset: number) => any
} = {
    int8: (view: DataView, offset: number) => {
        return view.getInt8(offset);
    },
    uint8: (view: DataView, offset: number) => {
        return view.getUint8(offset);
    },
    int16: (view: DataView, offset: number) => {
        return view.getInt16(offset, true);
    },
    uint16: (view: DataView, offset: number) => {
        return view.getUint16(offset, true);
    },
    uint32: (view: DataView, offset: number) => {
        return view.getUint32(offset, true);
    },
}

export abstract class Serializable {

    static serializable = true;

    public abstract get byteSize(): number;

    public deserialize(buf: ArrayBuffer): void {
        const _this = this as any;
        const view = new DataView(buf);
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, this);
        let offset = 0;
        for (const key of keys) {
            const optionalIndicate = Reflect.getMetadata(SERIALIZE_KEY.optional, this, key);
            if (optionalIndicate &&
                (((optionalIndicate === "remaining") && offset === buf.byteLength) ||
                (typeof optionalIndicate === "function" && !optionalIndicate(_this)))
            ) {
                continue;
            }
            if (key === "reserved") {
                continue;
            }
            const type = Reflect.getMetadata(SERIALIZE_KEY.type, this, key);
            let value: any;
            if (isLiteralType(type)) {
                value = bufferToLiteral[ LiteralType[type] ](view, offset);
                offset += literalByteLength[ LiteralType[type] ];
                _this[key] = value;
            } else if (isArrayType(type)) {
                let literalList = [];
                for (let i = 0, len = _this[key].length; i < len; i++) {
                    const element = _this[key][i];
                    if (isSerializeable(type.element)) {
                        element.deserialize(buf.slice(offset));
                        offset += element.byteSize;
                    } else if (isLiteralType(type.element)) {
                        literalList.push(bufferToLiteral[LiteralType[type.element as any] as any](view, offset));
                        offset += literalByteLength[ LiteralType[type.element as any] as any ];
                    }
                }
                if (isLiteralType(type.element)) {
                    _this[key] = literalList;
                }
            } else if (isArrayBufferType(type)) {
                let byteLength;
                if (typeof type.byteLength === "function") {
                    byteLength = type.byteLength(_this);
                } else {
                    byteLength = type.byteLength;
                }
                if (type.align && byteLength % 2 === 1) {
                    byteLength += 1;
                }
                _this[key] = buf.slice(offset, offset + byteLength);
                offset += byteLength;
            } else if (isStringType(type)) {
                let strBuf = buf.slice(offset, offset + type.byteLength);
                if (type.nullTerminated) {
                    const index = new Uint8Array(strBuf).findIndex(v => v === 0);
                    strBuf = strBuf.slice(0, index);
                }
                const str = decode(Buffer.from(strBuf), type.characters);
                _this[key] = str;
            } else {
                value = (new type() as Serializable);
                value.deserialize(buf.slice(offset));
                offset += value.byteSize;
                _this[key] = value;
            }
        }
    }

    public serialize(): ArrayBuffer {
        const _this = this as any;
        const buffer = new Uint8Array(this.byteSize);
        const view = new DataView(buffer.buffer);
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, this);
        let offset = 0;
        for (const key of keys) {
            const optionalIndicate = Reflect.getMetadata(SERIALIZE_KEY.optional, this, key);
            if (optionalIndicate &&
                (((optionalIndicate === "remaining") && offset === this.byteSize) ||
                    (typeof optionalIndicate === "function" && !optionalIndicate(_this)))
            ) {
                continue;
            }
            const type = Reflect.getMetadata(SERIALIZE_KEY.type, this, key);
            if (isLiteralType(type)) {
                literalToBuffer[LiteralType[type]](view, offset, _this[key]);
                offset += literalByteLength[ LiteralType[type] ];
            } else if (isArrayType(type)) {
                for (const element of _this[key]) {
                     if (LiteralType[type.element as LiteralType] !== undefined) {
                        literalToBuffer[LiteralType[type.element as LiteralType] as any](view, offset, element);
                        offset += literalByteLength[LiteralType[type.element as LiteralType] as any];
                    } else if (isSerializeable(type.element)) {
                        const buf: ArrayBuffer = element.serialize();
                        const uint8Buf = new Uint8Array(buf);
                        buffer.set(uint8Buf, offset);
                        offset += element.byteSize;
                    }
                }
            } else if (isArrayBufferType(type)) {
                let byteLength = _this[key].byteLength;
                if (type.align && byteLength % 2 === 1) {
                    byteLength += 1;
                }
                const targetBuf = new Uint8Array(byteLength);
                targetBuf.set(new Uint8Array(_this[key]), 0);
                buffer.set(targetBuf, offset);
                offset += byteLength;
            } else if (isStringType(type)) {
                const arrayBuf = new Uint8Array(type.byteLength);
                const buf = encode(_this[key], type.characters);
                for (let i = 0, len = type.byteLength; i < len; i++ ) {
                    if (buf[i]) {
                        arrayBuf[i] = buf[i];
                    } else {
                        arrayBuf[i] = 0;
                    }
                }
                buffer.set(arrayBuf, offset);
                offset += type.byteLength;
            } else {
                const buf: ArrayBuffer = _this[key].serialize();
                const uint8Buf = new Uint8Array(buf);
                buffer.set(uint8Buf, offset);
                offset += _this[key].byteSize;
            }
        }
        if (_this.recordFunction === RecordType.META_ESCAPE && _this.escape) {
            const escapeBuf = new Uint8Array(_this.escape.serialize());
            buffer.set(escapeBuf, offset);
        }
        return buffer.buffer;
    }

    public duplicate(from: this): void {
        const _this = this as any;
        const _from = from as any;
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, this);
        for (const key of keys) {
            const type = Reflect.getMetadata(SERIALIZE_KEY.type, this, key);
            if (isLiteralType(type)) {
                _this[ key ] = _from[ key ];
            } else if (isArrayType(type)) {
                _this[ key ] = _from[ key ];
            } else if (type === ArrayBuffer) {
                _this[ key ] = _from[ key ];
            } else {
                _this[ key ].duplicate(_from[ key ]);
            }
        }
    }

    public clone(): this {
        const _this = this as any;
        // @ts-ignore
        const target = new this.constructor();
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, this);
        for (const key of keys) {
            const type = Reflect.getMetadata(SERIALIZE_KEY.type, this, key);
            if (isLiteralType(type)) {
                target[ key ] = _this[ key ];
            } else if (isArrayType(type)) {
                _this[ key ] = _this[ key ];
            } else if (type === ArrayBuffer) {
                _this[ key ] = _this[ key ];
            } else {
                _this[ key ] = _this[ key ].clone();
            }
        }
        return target;
    }
}

export abstract class SerializableRecord extends Serializable {

    public abstract recordFunction: RecordType;
    public abstract recordSize: number;

    public get byteSize(): number {
        return this.recordSize * BYTE_PER_WORD;
    }
}

export abstract class SerializableEscape extends Serializable {

    public abstract escapeFunction: MetafileEscapes;
    public abstract escapeData: ArrayBuffer;
    public abstract byteCount: number;

    public get byteSize(): number {
        return 2 + 2 + this.escapeData.byteLength;
    }

}
