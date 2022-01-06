import { BinaryRasterOperation, MapMode, MetafileEscapes, MixMode, PolyFillMode } from "./enums";
export class BasicPlayback {
    constructor() {
        this.ctx = Object.create(null);
        this.objectTable = [];
        this.viewExt = { x: 0, y: 0 };
        this.viewOrigin = { x: 0, y: 0 };
    }
    init(recordsData) {
        this.header = recordsData.header;
        this.objectTable = new Array(recordsData.header.numberOfObjects);
        for (const record of recordsData.records) {
            if (record.fn === "META_ESCAPE") {
                if (this[record.payload.escapeFn]) {
                    this[record.payload.escapeFn].apply(this, record.payload.escapePayload);
                }
                else {
                    console.warn("unsupport escape fn ", record.payload.escapeFn);
                }
            }
            else {
                if (this[record.fn]) {
                    this[record.fn].apply(this, record.payload);
                }
                else {
                    console.warn("unsupported record", record.fn);
                }
            }
        }
    }
    getObject(index) {
        const obj = this.objectTable[index];
        if (!obj) {
            return null;
        }
        return obj;
    }
    putObject(obj) {
        const nextIndex = this.objectTable.findIndex(v => !v);
        this.objectTable[nextIndex] = obj;
    }
    META_SETWINDOWEXT(x, y) {
        this.viewExt = { x, y };
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }
    META_SETWINDOWORG(x, y) {
        this.viewOrigin = { x, y };
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }
    META_SETTEXTALIGN(alignFlag) {
        this.ctx.textAlign = alignFlag;
    }
    META_SETTEXTCOLOR(color) {
        this.ctx.textColor = color;
    }
    META_CREATEPENINDIRECT(pen) {
        this.putObject(pen);
    }
    META_SETPOLYFILLMODE(mode) {
        if (mode === PolyFillMode.ALTERNATE) {
            this.ctx.polyFillRule = "evenodd";
        }
        else if (mode === PolyFillMode.WINDING) {
            this.ctx.polyFillRule = "nonzero";
        }
    }
    META_SETMAPMODE(mode) {
        console.log("set map mode", MapMode[mode]);
    }
    META_SETBKMODE(mode) {
        console.log("set mix mode", MixMode[mode]);
    }
    META_SETROP2(drawMode) {
        console.log("set draw mode", BinaryRasterOperation[drawMode]);
    }
    META_ESCAPE(fn, data) {
        console.log("escape", MetafileEscapes[fn], data);
    }
    META_SELECTOBJECT(index) {
        const obj = this.getObject(index);
        if ((obj === null || obj === void 0 ? void 0 : obj.objectType) === "Pen") {
            this.ctx.pen = obj;
        }
        else if ((obj === null || obj === void 0 ? void 0 : obj.objectType) === "Brush") {
            this.ctx.brush = obj;
        }
    }
    META_CREATEBRUSHINDIRECT(logBrush) {
        this.putObject(logBrush);
    }
    META_DELETEOBJECT(index) {
        this.objectTable[index] = undefined;
    }
    META_EOF() {
        console.log("end");
    }
    META_POLYGON(points) {
        this.drawPolygon(points);
    }
    SETMITERLIMIT(miterLimit) {
        this.ctx.miterLimit = miterLimit;
    }
    META_SETBKCOLOR(color) {
        this.ctx.backgroundColor = color;
    }
}
