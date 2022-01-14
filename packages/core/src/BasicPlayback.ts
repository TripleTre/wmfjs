import { IPlaybackCtx } from "./IPlayback";
import {
    BinaryRasterOperation,
    BrushStyle,
    MapMode,
    MetafileEscapes,
    MixMode,
    PolyFillMode,
    RecordType
} from "./enums";
import { WindowsMetaFile } from "./WindowsMetaFile";
import { SerializableRecord } from "./Serializable";
import {
    META_ARC,
    META_CREATEBRUSHINDIRECT,
    META_CREATEPENINDIRECT,
    META_DELETEOBJECT, META_ELLIPSE,
    META_ESCAPE, META_LINETO,
    META_POLYGON,
    META_SELECTOBJECT,
    META_SETBKMODE,
    META_SETMAPMODE,
    META_SETPOLYFILLMODE,
    META_SETROP2,
    META_SETTEXTALIGN,
    META_SETTEXTCOLOR,
    META_SETWINDOWEXT,
    META_SETWINDOWORG,
} from "./records";
import { ColorRef, LogBrush, Pen, PointS } from "./structs";
import { SETMITERLIMIT } from "./escapes";
import { toCenteredArc } from "./utils";
import { META_CHORD } from "./records/META_CHORD";
import { CenteredArc } from "./types";
import { META_MOVETO } from "./records/META_MOVETO";

export function isEscape(record: SerializableRecord): record is META_ESCAPE {
    return record.recordFunction === RecordType.META_ESCAPE;
}

export type WMFObject = Pen | LogBrush;

export abstract class BasicPlayback {

    protected wmf: WindowsMetaFile;
    protected ctx: IPlaybackCtx = Object.create(null);

    private objectTable: (WMFObject | undefined)[] = [];
    private viewExt: PointS = new PointS();
    private viewOrigin: PointS = new PointS();

    protected abstract updateViewBox(ext: PointS, origin: PointS): void;
    protected abstract drawPolygon(points: PointS[]): void;
    protected abstract drawArc(arc: CenteredArc, close: boolean): void;
    protected abstract drawLine(point: PointS): void;
    protected abstract playEnd(): void;

    public constructor(wmfObject: WindowsMetaFile) {
        this.wmf = wmfObject;
        this.objectTable = new Array(wmfObject.header.numberOfObjects);
        this.ctx.brush = new LogBrush();
        this.ctx.brush.colorRef = new ColorRef();
        this.ctx.brush.colorRef.r = 255;
        this.ctx.brush.colorRef.g = 255;
        this.ctx.brush.colorRef.b = 255;
        this.ctx.currentPosition = new PointS();
    }

    public display(): void {
        for (const record of this.wmf.records) {
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
        this.playEnd();
    }

    META_POLYGON(record: META_POLYGON): void {
        this.drawPolygon(record.aPoints);
    }

    ESCAPE_SETMITERLIMIT(escape: SETMITERLIMIT): void {
        this.ctx.miterLimit = escape.miterLimit;
    }

    META_ARC(record: META_ARC): void {
        const { leftRect, rightRect, topRect, bottomRect, xStartArc, yStartArc, xEndArc, yEndArc } = record;
        const arc = toCenteredArc(yEndArc, xEndArc, yStartArc, xStartArc, leftRect, rightRect, topRect, bottomRect);
        const brushStyle = this.ctx.brush.brushStyle;
        this.ctx.brush.brushStyle = BrushStyle.BS_NULL;
        this.drawArc(arc, false);
        this.ctx.brush.brushStyle = brushStyle;
    }

    META_CHORD(record: META_CHORD): void {
        const { leftRect, rightRect, topRect, bottomRect, xRadial1, yRadial1, xRadial2, yRadial2 } = record;
        const arc = toCenteredArc(yRadial2, xRadial2, yRadial1, xRadial1, leftRect, rightRect, topRect, bottomRect);
        this.drawArc(arc, true);
    }

    META_ELLIPSE(record: META_ELLIPSE): void {
        const { leftRect, rightRect, topRect, bottomRect } = record;
        const cx = (leftRect + rightRect) / 2;
        const cy = (topRect + bottomRect) / 2;
        const rx = (rightRect - leftRect) / 2;
        const ry = (bottomRect - topRect) / 2;
        this.drawArc({
            cx, cy, rx, ry,
            stAngle: 0,
            swAngle: Math.PI,
        }, false);
        this.drawArc({
            cx, cy, rx, ry,
            stAngle: Math.PI,
            swAngle: Math.PI,
        }, false);
    }

    META_MOVETO(record: META_MOVETO): void {
        this.ctx.currentPosition.x = record.x;
        this.ctx.currentPosition.y = record.y;
    }

    META_LINETO(record: META_LINETO): void {
        const brushStyle = this.ctx.brush.brushStyle;
        this.ctx.brush.brushStyle = BrushStyle.BS_NULL;
        const p = new PointS();
        p.x = record.x;
        p.y = record.y;
        this.drawLine(p)
        this.ctx.currentPosition.x = record.x;
        this.ctx.currentPosition.y = record.y;
        this.ctx.brush.brushStyle = brushStyle;
    }
}
