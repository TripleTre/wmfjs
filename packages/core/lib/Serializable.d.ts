import { LiteralType } from "./decorators";
import { MetafileEscapes, RecordType } from "./enums";
export declare const BYTE_PER_WORD = 2;
export declare const literalByteLength: {
    [key in keyof typeof LiteralType]: number;
};
export declare const literalToBuffer: {
    [key in keyof typeof LiteralType]: (view: DataView, offset: number, value: number) => void;
};
export declare const bufferToLiteral: {
    [key in keyof typeof LiteralType]: (view: DataView, offset: number) => any;
};
export declare abstract class Serializable {
    abstract get byteSize(): number;
    deserialize(buf: ArrayBuffer): void;
    serialize(): ArrayBuffer;
}
export declare abstract class SerializableRecord extends Serializable {
    abstract recordFunction: RecordType;
    abstract recordSize: number;
    get byteSize(): number;
}
export declare abstract class SerializableEscape extends Serializable {
    abstract escapeFunction: MetafileEscapes;
    abstract escapeData: ArrayBuffer;
    abstract byteCount: number;
    get byteSize(): number;
}
