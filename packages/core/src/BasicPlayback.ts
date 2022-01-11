import { IPlaybackCtx } from "./IPlayback";
import { BinaryRasterOperation, MapMode, MetafileEscapes, MixMode, PolyFillMode, RecordType } from "./enums";
import { WMF } from "./WMF";
import { SerializableRecord } from "./Serializable";
import { META_ESCAPE } from "./records/META_ESCAPE";
import { META_SETWINDOWEXT } from "./records/META_SETWINDOWEXT";
import { META_SETWINDOWORG } from "./records/META_SETWINDOWORG";
import { META_SETTEXTALIGN } from "./records/META_SETTEXTALIGN";
import { META_SETTEXTCOLOR } from "./records/META_SETTEXTCOLOR";
import { META_CREATEPENINDIRECT } from "./records/META_CREATEPENINDIRECT";
import { Pen } from "./structs/Pen";
import { LogBrush } from "./structs/LogBrush";
import { PointS } from "./structs/PointS";
import { META_SETPOLYFILLMODE } from "./records/META_SETPOLYFILLMODE";
import { META_SETMAPMODE } from "./records/META_SETMAPMODE";
import { META_SETBKMODE } from "./records/META_SETBKMODE";
import { META_SETROP2 } from "./records/META_SETROP2";
import { META_SELECTOBJECT } from "./records/META_SELECTOBJECT";
import { META_CREATEBRUSHINDIRECT } from "./records/META_CREATEBRUSHINDIRECT";
import { META_DELETEOBJECT } from "./records/META_DELETEOBJECT";
import { META_POLYGON } from "./records/META_POLYGON";
import { SETMITERLIMIT } from "./escapes/SETMITERLIMIT";

export function isEscape(record: SerializableRecord): record is META_ESCAPE {
    return record.recordFunction === RecordType.META_ESCAPE;
}

export type WMFObject = Pen | LogBrush;

export abstract class BasicPlayback {

    protected wmf: WMF;
    protected ctx: IPlaybackCtx = Object.create(null);

    private objectTable: (WMFObject | undefined)[] = [];
    private viewExt: PointS = new PointS();
    private viewOrigin: PointS = new PointS();

    protected abstract updateViewBox(ext: PointS, origin: PointS): void;
    protected abstract drawPolygon(points: PointS[]): void;

    public constructor(wmfObject: WMF) {
        this.wmf = wmfObject;
        this.objectTable = new Array(wmfObject.header.numberOfObjects);
        for (const record of wmfObject.records) {
            if (isEscape(record)) {
                const escapeFn = `ESACPE_${MetafileEscapes[record.escape.escapeFunction]}`;
                if ((this as any)[escapeFn]) {
                    (this as any)[escapeFn].apply(this, [record.escape]);
                } else {
                    console.warn("unsupport escape fn ", MetafileEscapes[record.escape.escapeFunction]);
                }
            } else {
                if ((this as any)[RecordType[record.recordFunction]]) {
                    (this as any)[RecordType[record.recordFunction]].apply(this, [record]);
                } else {
                    console.warn("unsupported record", RecordType[record.recordFunction]);
                }
            }
        }
    }

    protected getObject(index: number): WMFObject | null {
        const obj = this.objectTable[index];
        if (!obj) {
            return null;
        }
        return obj;
    }

    protected putObject(obj: any): void {
        const nextIndex = this.objectTable.findIndex(v => !v);
        this.objectTable[nextIndex] = obj;
    }

    META_SETWINDOWEXT(record: META_SETWINDOWEXT): void {
        this.viewExt.x = record.x;
        this.viewExt.y = record.y;
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }

    META_SETWINDOWORG(record: META_SETWINDOWORG): void {
        this.viewOrigin.x = record.x;
        this.viewOrigin.y = record.y;
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }

    META_SETTEXTALIGN(record: META_SETTEXTALIGN): void {
        this.ctx.textAlign = record.textAlignmentMode;
    }

    META_SETTEXTCOLOR(record: META_SETTEXTCOLOR): void {
        this.ctx.textColor = record.colorRef.valueOf();
    }

    META_CREATEPENINDIRECT(record: META_CREATEPENINDIRECT): void {
        this.putObject(record.pen);
    }

    META_SETPOLYFILLMODE(record: META_SETPOLYFILLMODE): void {
        if (record.polyFillMode === PolyFillMode.ALTERNATE) {
            this.ctx.polyFillRule = "evenodd";
        } else if (record.polyFillMode === PolyFillMode.WINDING) {
            this.ctx.polyFillRule = "nonzero"
        }
    }

    META_SETMAPMODE(record: META_SETMAPMODE): void {
        console.log("set map mode", MapMode[record.mapMode]);
    }

    META_SETBKMODE(record: META_SETBKMODE): void {
        console.log("set mix mode", MixMode[record.BkMode]);
    }

    META_SETROP2(record: META_SETROP2): void {
        console.log("set draw mode", BinaryRasterOperation[record.drawMode]);
    }

    META_SELECTOBJECT(record: META_SELECTOBJECT): void {
        const obj = this.getObject(record.objectIndex);
        if (obj instanceof Pen) {
            this.ctx.pen = obj;
        } else if (obj instanceof LogBrush) {
            this.ctx.brush = obj;
        }
    }

    META_CREATEBRUSHINDIRECT(record: META_CREATEBRUSHINDIRECT): void {
        this.putObject(record.logBrush);
    }

    META_DELETEOBJECT(record: META_DELETEOBJECT): void {
        this.objectTable[record.objectIndex] = undefined;
    }

    META_EOF(): void {
        console.log("end");
    }

    META_POLYGON(record: META_POLYGON): void {
        this.drawPolygon(record.aPoints);
    }

    ESCAPE_SETMITERLIMIT(escape: SETMITERLIMIT): void {
        this.ctx.miterLimit = escape.miterLimit;
    }
}
