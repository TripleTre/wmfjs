import { BinaryRasterOperation, MapMode, MetafileEscapes, MixMode, PolyFillMode, RecordType } from "./enums";
import { Pen } from "./structs/Pen";
import { LogBrush } from "./structs/LogBrush";
import { PointS } from "./structs/PointS";
export function isEscape(record) {
    return record.recordFunction === RecordType.META_ESCAPE;
}
export class BasicPlayback {
    constructor(wmfObject) {
        this.ctx = Object.create(null);
        this.objectTable = [];
        this.viewExt = new PointS();
        this.viewOrigin = new PointS();
        this.wmf = wmfObject;
        this.objectTable = new Array(wmfObject.header.numberOfObjects);
        for (const record of wmfObject.records) {
            if (isEscape(record)) {
                const escapeFn = `ESACPE_${MetafileEscapes[record.escape.escapeFunction]}`;
                if (this[escapeFn]) {
                    this[escapeFn].apply(this, [record.escape]);
                }
                else {
                    console.warn("unsupport escape fn ", MetafileEscapes[record.escape.escapeFunction]);
                }
            }
            else {
                if (this[RecordType[record.recordFunction]]) {
                    this[RecordType[record.recordFunction]].apply(this, [record]);
                }
                else {
                    console.warn("unsupported record", RecordType[record.recordFunction]);
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
    META_SETWINDOWEXT(record) {
        this.viewExt.x = record.x;
        this.viewExt.y = record.y;
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }
    META_SETWINDOWORG(record) {
        this.viewOrigin.x = record.x;
        this.viewOrigin.y = record.y;
        this.updateViewBox(this.viewExt, this.viewOrigin);
    }
    META_SETTEXTALIGN(record) {
        this.ctx.textAlign = record.textAlignmentMode;
    }
    META_SETTEXTCOLOR(record) {
        this.ctx.textColor = record.colorRef.valueOf();
    }
    META_CREATEPENINDIRECT(record) {
        this.putObject(record.pen);
    }
    META_SETPOLYFILLMODE(record) {
        if (record.polyFillMode === PolyFillMode.ALTERNATE) {
            this.ctx.polyFillRule = "evenodd";
        }
        else if (record.polyFillMode === PolyFillMode.WINDING) {
            this.ctx.polyFillRule = "nonzero";
        }
    }
    META_SETMAPMODE(record) {
        console.log("set map mode", MapMode[record.mapMode]);
    }
    META_SETBKMODE(record) {
        console.log("set mix mode", MixMode[record.BkMode]);
    }
    META_SETROP2(record) {
        console.log("set draw mode", BinaryRasterOperation[record.drawMode]);
    }
    META_SELECTOBJECT(record) {
        const obj = this.getObject(record.objectIndex);
        if (obj instanceof Pen) {
            this.ctx.pen = obj;
        }
        else if (obj instanceof LogBrush) {
            this.ctx.brush = obj;
        }
    }
    META_CREATEBRUSHINDIRECT(record) {
        this.putObject(record.logBrush);
    }
    META_DELETEOBJECT(record) {
        this.objectTable[record.objectIndex] = undefined;
    }
    META_EOF() {
        console.log("end");
    }
    META_POLYGON(record) {
        this.drawPolygon(record.aPoints);
    }
    ESCAPE_SETMITERLIMIT(escape) {
        this.ctx.miterLimit = escape.miterLimit;
    }
}
