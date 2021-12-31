import { IPlayback, IPlaybackCtx } from "../IPlayback";
import { BinaryRasterOperation, MapMode, MetafileEscapes, MixMode, PolyFillMode } from "../enums";
import { LogBrush, Pen, PointS } from "../structs";
import { Header, Placeable } from "../types";
import { penStyleToAttrs } from "./help";

export class SvgPlayback implements IPlayback {

    private svgElement: SVGElement;

    private header!: Header;
    private placeable?: Placeable;
    private objectTable: any[] = [];
    private ctx!: IPlaybackCtx;

    private viewExt: PointS = { x: 0, y: 0 };
    private viewOrigin: PointS = { x: 0, y: 0 };
    private polyFillRule: "nonzero" | "evenodd" = "evenodd";
    private miterLimit: number = -1;

    public constructor() {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svgElement.setAttribute("version", "1.1");
    }

    init(header: Header, placeable: Placeable) {
        this.header = header;
        this.objectTable = new Array(header.numberOfObjects);
    }

    private updateViewBox() {
        this.svgElement.setAttribute("viewBox", `${this.viewOrigin.x} ${this.viewOrigin.y} ${this.viewExt.x} ${this.viewExt.y}`);
    }

    private getObject(index: number): any {
        return this.objectTable[index - 1];
    }

    private putObject(obj: any): void {
        const nextIndex = this.objectTable.findIndex(v => !v);
        this.objectTable[nextIndex] = obj;
    }

    META_SETWINDOWEXT(x: number, y: number): void {
        this.viewExt = { x, y };
        this.updateViewBox();
    }

    META_SETWINDOWORG(x: number, y: number): void {
        this.viewOrigin = { x, y };
        this.updateViewBox();
    }

    META_SETMAPMODE(mode: MapMode): void {
        console.log("set map mode", MapMode[mode]);
    }

    META_SETBKMODE(mode: MixMode): void {
        console.log("set mix mode", MixMode[mode]);
    }

    META_SETPOLYFILLMODE(mode: PolyFillMode): void {
        if (mode === PolyFillMode.ALTERNATE) {
            this.polyFillRule = "evenodd";
        } else if (mode === PolyFillMode.WINDING) {
            this.polyFillRule = "nonzero"
        }
    }

    META_SETTEXTALIGN(alignFlag: number): void {
        console.log("set text align", alignFlag);
    }

    META_SETTEXTCOLOR(color: number): void {
        console.log("set text color", color);
    }

    META_SETROP2(drawMode: BinaryRasterOperation): void {
        console.log("set draw mode", BinaryRasterOperation[drawMode]);
    }

    META_ESCAPE(fn: MetafileEscapes, data: ArrayBuffer): void {
        console.log("escape", MetafileEscapes[fn], data);
    }

    META_CREATEPENINDIRECT(pen: Pen): void {
        console.log("create pen", pen);
        penStyleToAttrs(pen.style);
    }

    META_SELECTOBJECT(index: number): void {
        console.log("select object", index);
    }

    META_CREATEBRUSHINDIRECT(logBrush: LogBrush): void {
        console.log("crate log brush", logBrush);
    }

    META_DELETEOBJECT(index: number): void {
        console.log("delete object", index);
    }

    META_EOF(): void {
        console.log("end");
    }

    META_POLYGON(points: PointS[]): void {
        console.log("polygon", points);
    }

    SETMITERLIMIT(miterLimit: number): void {
        this.miterLimit = miterLimit;
    }
}
