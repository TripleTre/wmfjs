import { isArrayType, isLiteralType, LiteralType, SERIALIZE_KEY } from "./decorators";
import { MetafileEscapes, RecordType } from "./enums";

export const literalByteLength: {
    [key in keyof typeof LiteralType]: number
} = {
    int8: 1,
    uint8: 1,
    int16: 2,
    uint16: 2,
    uint32: 4,
}

export const literalTransform: {
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

    public abstract get byteSize(): number;

    public deserialize(buf: ArrayBuffer): void {
        const _this = this as any;
        const view = new DataView(buf);
        const keys = Reflect.getMetadata(SERIALIZE_KEY.keys, this);
        let offset = 0;
        for (const key of keys) {
            const type = Reflect.getMetadata(SERIALIZE_KEY.type, this, key);
            let value: any;
            if (isLiteralType(type)) {
                value = literalTransform[ LiteralType[type] ](view, offset);
                offset += literalByteLength[ LiteralType[type] ];
                _this[key] = value;
            } else if (isArrayType(type)) {
                for (const element of _this[key]) {
                    element.deserialize(buf.slice(offset));
                    offset += element.byteSize;
                }
            } else if (type === ArrayBuffer) {
                _this[key] = buf.slice(offset);
            } else {
                value = (new type() as Serializable);
                value.deserialize(buf.slice(offset));
                offset += value.byteSize;
                _this[key] = value;
            }
        }
    }

    public serialize(): void {
    }
}

export abstract class SerializableRecord extends Serializable {

    public abstract recordFunction: RecordType;
    public abstract recordSize: number;

    public get byteSize(): number {
        return this.recordSize;
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
