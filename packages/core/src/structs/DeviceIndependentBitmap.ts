// @ts-ignore
import { PNG } from "pngjs/browser";
import { Serializable } from "../Serializable";
import { BitmapCoreHeader } from "./BitmapCoreHeader";
import { optional, serialize } from "../decorators";
import { BitmapInfoHeader } from "./BitmapInfoHeader";
import { BitCount, Compression } from "../enums";

export class DeviceIndependentBitmap extends Serializable {

    get byteSize(): number {
        return this.DIBHeaderInfo.byteLength + (this.colors ? this.colors.byteLength : 0) + this.bitmapBuffer.byteLength;
    };

    public DIBHeaderInfo_core: BitmapCoreHeader | null = null;
    public DIBHeaderInfo_info: BitmapInfoHeader | null = null;

    get width(): number {
        return (this.DIBHeaderInfo_info?.width || this.DIBHeaderInfo_core?.width)!
    };

    get height(): number {
        return (this.DIBHeaderInfo_info?.height || this.DIBHeaderInfo_core?.height)!
    };

    private hasColors(): boolean {
        if (this.DIBHeaderInfo_info && this.DIBHeaderInfo_info.bitCount === BitCount.BI_BITCOUNT_5) {
            return false;
        }
        throw new Error("[DeviceIndependentBitmap] unsupported header");
    }

    private aDataSize(): number {
        if (this.DIBHeaderInfo_info) {
            if (this.DIBHeaderInfo_info.compression === Compression.BI_RGB ||
                this.DIBHeaderInfo_info.compression === Compression.BI_BITFIELDS ||
                this.DIBHeaderInfo_info.compression === Compression.BI_CMYK) {
                return (((this.DIBHeaderInfo_info.width * this.DIBHeaderInfo_info.planes * this.DIBHeaderInfo_info.bitCount + 31) & ~31) / 8)
                    * Math.abs(this.DIBHeaderInfo_info.height);
            } else {
                return this.DIBHeaderInfo_info.imageSize;
            }
        } else {
            const {width, planes, bitCount, height} = this.DIBHeaderInfo_core!;
            return (((width * planes * bitCount + 31) & ~31) / 8) * Math.abs(height);
        }
    }

    @serialize({type: "ArrayBuffer", byteLength: 40})
    public get DIBHeaderInfo(): ArrayBuffer {
        return (this.DIBHeaderInfo_core || this.DIBHeaderInfo_info)!.serialize();
    }

    public set DIBHeaderInfo(buf: ArrayBuffer) {
        const size = new DataView(buf).getUint32(0, true);
        if (size === 0x0000000C) {
            this.DIBHeaderInfo_core = new BitmapCoreHeader();
            this.DIBHeaderInfo_core.deserialize(buf.slice(0, 12));
        } else {
            this.DIBHeaderInfo_info = new BitmapInfoHeader();
            this.DIBHeaderInfo_info.deserialize(buf);
        }
    }

    @optional((_this: DeviceIndependentBitmap) => _this.hasColors())
    @serialize({type: "ArrayBuffer", byteLength: 0})
    public colors?: ArrayBuffer;

    public undefinedSpace?: ArrayBuffer;
    public aData: ArrayBuffer = new ArrayBuffer(0);

    @serialize({
        type: "ArrayBuffer",
        byteLength: -1,
    })
    public set bitmapBuffer(val: ArrayBuffer) {
        const aDataSize = this.aDataSize();
        const undefinedSize = val.byteLength - aDataSize;
        if (undefinedSize > 0) {
            this.undefinedSpace = new ArrayBuffer(undefinedSize);
        }
        this.aData = val.slice(undefinedSize);
    }

    public get bitmapBuffer(): ArrayBuffer {
        const undefinedSize = (this.undefinedSpace ? this.undefinedSpace.byteLength : 0);
        const length = undefinedSize + this.aData.byteLength;
        const buf = new Uint8Array(length);
        if (this.undefinedSpace) {
            buf.set(new Uint8Array(this.undefinedSpace), 0);
        }
        buf.set(new Uint8Array(this.aData), undefinedSize);
        return buf.buffer;
    }

    public png(): string {
        const height = (this.DIBHeaderInfo_info?.height || this.DIBHeaderInfo_core?.height)!;
        const isBottomToUp = height > 0;
        const img = new PNG({
            width: this.DIBHeaderInfo_info?.width || this.DIBHeaderInfo_core?.width,
            height: Math.abs(height),
        });

        if (this.DIBHeaderInfo_info) {
            if (this.DIBHeaderInfo_info.compression === Compression.BI_RGB) {
                let aDataIndex = 0;
                for (let y = 0; y < img.height; y++) {
                    for (let x = 0; x < img.width; x++) {
                        const view = new DataView(this.aData);
                        const idx = (img.width * (isBottomToUp ? img.height - y : y) + x) * 4;
                        img.data[ idx + 2 ] = view.getUint8(aDataIndex++);
                        img.data[ idx + 1 ] = view.getUint8(aDataIndex++);
                        img.data[ idx ] = view.getUint8(aDataIndex++);
                        img.data[ idx + 3 ] = 255;
                    }
                    // byte alignment
                    if (img.width % 2 !== 0) {
                        aDataIndex++;
                    }
                }
            }
        } else if (this.DIBHeaderInfo_core) {

        }

        const buf = PNG.sync.write(img);
        const base64Str = btoa(String.fromCharCode(...buf));
        return `data:image/png;base64,${base64Str}`;
    }
}
