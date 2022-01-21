import { IPlaybackCtx } from "./IPlayback";
import {
    BinaryRasterOperation,
    BrushStyle,
    MapMode,
    MetafileEscapes,
    MixMode,
    PolyFillMode,
    PostScriptJoin,
    RecordType
} from "./enums";
import { WindowsMetaFile } from "./WindowsMetaFile";
import { SerializableRecord } from "./Serializable";
import {
    META_ARC,
    META_CREATEBRUSHINDIRECT,
    META_CREATEPENINDIRECT,
    META_CREATEREGION,
    META_DELETEOBJECT,
    META_ELLIPSE,
    META_ESCAPE,
    META_LINETO,
    META_PIE,
    META_POLYGON,
    META_POLYLINE,
    META_POLYPOLYGON,
    META_RECTANGLE, META_ROUNDRECT,
    META_SELECTOBJECT,
    META_SETBKMODE,
    META_SETMAPMODE,
    META_SETPOLYFILLMODE,
    META_SETROP2,
    META_SETTEXTALIGN,
    META_SETTEXTCOLOR,
    META_SETWINDOWEXT,
    META_SETWINDOWORG
} from "./records";
import { ColorRef, LogBrush, Pen, PointS } from "./structs";
import { SETMITERLIMIT } from "./escapes";
import { getCenteredArcEndPoint, getCenteredArcStartPoint, toCenteredArc } from "./utils";
import { META_CHORD } from "./records/META_CHORD";
import { CenteredArc } from "./types";
import { META_MOVETO } from "./records/META_MOVETO";
import { Region } from "./structs/Region";

export function isEscape(record: SerializableRecord): record is META_ESCAPE {
    return record.recordFunction === RecordType.META_ESCAPE;
}

export type WMFObject = Pen | LogBrush | Region;

export abstract class BasicPlayback {

    protected wmf: WindowsMetaFile;
    protected ctx: IPlaybackCtx = Object.create(null);

    private objectTable: (WMFObject | undefined)[] = [];
    private viewExt: PointS = new PointS();
    private viewOrigin: PointS = new PointS();

    protected abstract updateViewBox(ext: PointS, origin: PointS): void;

    protected abstract drawPolygon(points: PointS[], close: boolean): void;

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
        this.ctx.lineJoin = PostScriptJoin.PostScriptRoundJoin;
    }

    public display(): void {
        for (const record of this.wmf.records) {
            if (isEscape(record)) {
                const escapeFn = `ESCAPE_${MetafileEscapes[ record.escape.escapeFunction ]}`;
                if ((this as any)[ escapeFn ]) {
                    (this as any)[ escapeFn ].apply(this, [record.escape]);
                } else {
                    console.warn("unsupport escape fn ", MetafileEscapes[ record.escape.escapeFunction ]);
                }
            } else {
                if ((this as any)[ RecordType[ record.recordFunction ] ]) {
                    (this as any)[ RecordType[ record.recordFunction ] ].apply(this, [record]);
                } else {
                    console.warn("unsupported record", RecordType[ record.recordFunction ]);
                }
            }
        }
    }

    protected getObject(index: number): WMFObject | null {
        const obj = this.objectTable[ index ];
        if (!obj) {
            return null;
        }
        return obj;
    }

    protected putObject(obj: WMFObject): void {
        const nextIndex = this.objectTable.findIndex(v => !v);
        this.objectTable[ nextIndex ] = obj;
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

    META_CREATEREGION(record: META_CREATEREGION): void {
        this.putObject(record.region);
    }

    META_SETPOLYFILLMODE(record: META_SETPOLYFILLMODE): void {
        if (record.polyFillMode === PolyFillMode.ALTERNATE) {
            this.ctx.polyFillRule = "nonzero";
        } else if (record.polyFillMode === PolyFillMode.WINDING) {
            this.ctx.polyFillRule = "evenodd"
        }
    }

    META_SETMAPMODE(record: META_SETMAPMODE): void {
        console.log("set map mode", MapMode[ record.mapMode ]);
    }

    META_SETBKMODE(record: META_SETBKMODE): void {
        console.log("set mix mode", MixMode[ record.BkMode ]);
    }

    META_SETROP2(record: META_SETROP2): void {
        console.log("set draw mode", BinaryRasterOperation[ record.drawMode ]);
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
        this.objectTable[ record.objectIndex ] = undefined;
    }

    META_EOF(): void {
        this.playEnd();
    }

    META_POLYGON(record: META_POLYGON): void {
        this.drawPolygon(record.aPoints, true);
    }

    META_POLYLINE(record: META_POLYLINE): void {
        const brushStyle = this.ctx.brush.brushStyle;
        this.ctx.brush.brushStyle = BrushStyle.BS_NULL;
        this.drawPolygon(record.aPoints, false);
        this.ctx.brush.brushStyle = brushStyle;
    }

    ESCAPE_SETMITERLIMIT(escape: SETMITERLIMIT): void {
        this.ctx.miterLimit = escape.miterLimit;
    }

    META_ARC(record: META_ARC): void {
        const {leftRect, rightRect, topRect, bottomRect, xStartArc, yStartArc, xEndArc, yEndArc} = record;
        const arc = Object.freeze(toCenteredArc(yEndArc, xEndArc, yStartArc, xStartArc, leftRect, rightRect, topRect, bottomRect));
        const brushStyle = this.ctx.brush.brushStyle;
        this.ctx.brush.brushStyle = BrushStyle.BS_NULL;
        this.drawArc(arc, false);
        this.ctx.brush.brushStyle = brushStyle;
    }

    META_CHORD(record: META_CHORD): void {
        const {leftRect, rightRect, topRect, bottomRect, xRadial1, yRadial1, xRadial2, yRadial2} = record;
        const arc = toCenteredArc(yRadial2, xRadial2, yRadial1, xRadial1, leftRect, rightRect, topRect, bottomRect);
        this.drawArc(arc, true);
    }

    META_PIE(record: META_PIE): void {
        const {leftRect, rightRect, topRect, bottomRect, xRadial1, yRadial1, xRadial2, yRadial2} = record;
        const arc = toCenteredArc(yRadial2, xRadial2, yRadial1, xRadial1, leftRect, rightRect, topRect, bottomRect);
        this.ctx.currentPosition.x = arc.cx;
        this.ctx.currentPosition.y = arc.cy;
        const startPoint = getCenteredArcStartPoint(arc);
        this.drawLine(new PointS({x: startPoint.x, y: startPoint.y}));
        this.drawArc(arc, true);
    }

    META_ELLIPSE(record: META_ELLIPSE): void {
        const {leftRect, rightRect, topRect, bottomRect} = record;
        const cx = (leftRect + rightRect) / 2;
        const cy = (topRect + bottomRect) / 2;
        const rx = (rightRect - leftRect) / 2;
        const ry = (bottomRect - topRect) / 2;
        this.drawArc({
            cx, cy, rx, ry,
            stAngle: 0,
            swAngle: Math.PI,
            sweep: 0,
        }, false);
        this.drawArc({
            cx, cy, rx, ry,
            stAngle: Math.PI,
            swAngle: Math.PI,
            sweep: 0,
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

    META_POLYPOLYGON(record: META_POLYPOLYGON): void {
        record.polyPolygon.polygons.forEach(p => {
            this.drawPolygon(p, true);
        });
    }

    META_RECTANGLE(record: META_RECTANGLE): void {
        const lineJoin = this.ctx.lineJoin;
        this.ctx.lineJoin = PostScriptJoin.PostScriptRoundJoin;
        this.drawPolygon([
                new PointS({x: record.leftRect, y: record.topRect}),
                new PointS({x: record.rightRect, y: record.topRect}),
                new PointS({x: record.rightRect, y: record.bottomRect}),
                new PointS({x: record.leftRect, y: record.bottomRect}),
            ],
            true
        );
        this.ctx.lineJoin = lineJoin;
    }

    META_ROUNDRECT(record: META_ROUNDRECT): void {
        const halfPI = Math.PI / 2;
        const radius = {
            rx: record.width / 2,
            ry: record.height / 2,
        };
        const absRadius = {
            rx: Math.abs(radius.rx),
            ry: Math.abs(radius.ry),
        };
        const arcTL: CenteredArc = {
            cx: record.leftRect + radius.rx,
            cy: record.topRect + radius.ry,
            stAngle: radius.ry < 0 ? halfPI * 3 : halfPI,
            swAngle: halfPI,
            sweep: radius.rx * radius.ry < 0 ? 1 : 0,
            ...absRadius,
        };
        let arcTLStart = getCenteredArcStartPoint(arcTL);
        let arcTLEnd = getCenteredArcEndPoint(arcTL);
        this.ctx.currentPosition.x = arcTLStart.x;
        this.ctx.currentPosition.y = arcTLStart.y;
        this.drawArc(arcTL, false);
        this.ctx.currentPosition.x = arcTLEnd.x;
        this.ctx.currentPosition.y = arcTLEnd.y;
        const arcBL: CenteredArc = {
            cx: record.leftRect + radius.rx,
            cy: record.bottomRect - radius.ry,
            stAngle: radius.rx > 0 ? Math.PI : 0,
            swAngle: halfPI,
            sweep: radius.rx * radius.ry < 0 ? 1 : 0,
            ...absRadius,
        };
        const arcBLStart = getCenteredArcStartPoint(arcBL);
        const arcBLEnd = getCenteredArcEndPoint(arcBL);
        this.drawLine(arcBLStart);
        this.drawArc(arcBL, false);
        this.ctx.currentPosition.x = arcBLEnd.x;
        this.ctx.currentPosition.y = arcBLEnd.y;
        const arcBR: CenteredArc = {
            cx: record.rightRect - radius.rx,
            cy: record.bottomRect - radius.ry,
            stAngle: radius.ry < 0 ? halfPI : halfPI * 3,
            swAngle: halfPI,
            sweep: radius.rx * radius.ry < 0 ? 1 : 0,
            ...absRadius,
        };
        const arcBRStart = getCenteredArcStartPoint(arcBR);
        const arcBREnd = getCenteredArcEndPoint(arcBR);
        this.drawLine(arcBRStart);
        this.drawArc(arcBR, false);
        this.ctx.currentPosition.x = arcBREnd.x;
        this.ctx.currentPosition.y = arcBREnd.y;
        const arcTR: CenteredArc = {
            cx: record.rightRect - radius.rx,
            cy: record.topRect + radius.ry,
            stAngle: radius.rx > 0 ? 0 : Math.PI,
            swAngle: Math.PI / 2,
            sweep: radius.rx * radius.ry < 0 ? 1 : 0,
            ...absRadius,
        };
        const arcTRStart = getCenteredArcStartPoint(arcTR);
        const arcTREnd = getCenteredArcEndPoint(arcTR);
        this.drawLine(arcTRStart);
        this.drawArc(arcTR, false);
        this.ctx.currentPosition.x = arcTREnd.x;
        this.ctx.currentPosition.y = arcTREnd.y;
        this.drawLine(arcTLStart);
    }
}
