import { IPlayback, IPlaybackCtx } from "./IPlayback";
import { Header, Placeable } from "./types";
import { LogBrush, Pen, PointS, WMFObject } from "./structs";
import { BinaryRasterOperation, MapMode, MetafileEscapes, MixMode, PolyFillMode } from "./enums";

export abstract class BasicPlayback implements IPlayback {

    protected header!: Header;
    protected placeable?: Placeable;
    protected ctx: IPlaybackCtx = Object.create(null);

    private objectTable: (WMFObject | undefined)[] = [];
    private viewExt: PointS = { x: 0, y: 0 };
    private viewOrigin: PointS = { x: 0, y: 0 };

    protected abstract updateViewBox(ext: PointS, origin: PointS): void;
    protected abstract drawPolygon(points: PointS[]): void;

    public init(header: Header, placeable: Placeable) {
        this.header = header;
        this.objectTable = new Array(header.numberOfObjects);
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

    META_SETWINDOWEXT(x: number, y: number): void {
        this.viewExt = { x, y };
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }

    META_SETWINDOWORG(x: number, y: number): void {
        this.viewOrigin = { x, y };
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }

    META_SETTEXTALIGN(alignFlag: number): void {
        this.ctx.textAlign = alignFlag;
    }

    META_SETTEXTCOLOR(color: number): void {
        this.ctx.textColor = color;
    }

    META_CREATEPENINDIRECT(pen: Pen): void {
        this.putObject(pen);
    }

    META_SETPOLYFILLMODE(mode: PolyFillMode): void {
        if (mode === PolyFillMode.ALTERNATE) {
            this.ctx.polyFillRule = "evenodd";
        } else if (mode === PolyFillMode.WINDING) {
            this.ctx.polyFillRule = "nonzero"
        }
    }

    META_SETMAPMODE(mode: MapMode): void {
        console.log("set map mode", MapMode[mode]);
    }

    META_SETBKMODE(mode: MixMode): void {
        console.log("set mix mode", MixMode[mode]);
    }

    META_SETROP2(drawMode: BinaryRasterOperation): void {
        console.log("set draw mode", BinaryRasterOperation[drawMode]);
    }

    META_ESCAPE(fn: MetafileEscapes, data: ArrayBuffer): void {
        console.log("escape", MetafileEscapes[fn], data);
    }

    META_SELECTOBJECT(index: number): void {
        const obj = this.getObject(index);
        if (obj?.objectType === "Pen") {
            this.ctx.pen = obj;
        } else if (obj?.objectType === "Brush") {
            this.ctx.brush = obj;
        }
    }

    META_CREATEBRUSHINDIRECT(logBrush: LogBrush): void {
        this.putObject(logBrush);
    }

    META_DELETEOBJECT(index: number): void {
        this.objectTable[index] = undefined;
    }

    META_EOF(): void {
        console.log("end");
    }

    META_POLYGON(points: PointS[]): void {
        this.drawPolygon(points);
    }

    SETMITERLIMIT(miterLimit: number): void {
        this.ctx.miterLimit = miterLimit;
    }

    META_SETBKCOLOR(color: number): void {
        this.ctx.backgroundColor = color;
    }
}
