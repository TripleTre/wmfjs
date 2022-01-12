"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicPlayback = exports.isEscape = void 0;
const enums_1 = require("./enums");
const structs_1 = require("./structs");
const utils_1 = require("./utils");
function isEscape(record) {
    return record.recordFunction === enums_1.RecordType.META_ESCAPE;
}
exports.isEscape = isEscape;
class BasicPlayback {
    constructor(wmfObject) {
        this.ctx = Object.create(null);
        this.objectTable = [];
        this.viewExt = new structs_1.PointS();
        this.viewOrigin = new structs_1.PointS();
        this.wmf = wmfObject;
        this.objectTable = new Array(wmfObject.header.numberOfObjects);
    }
    display() {
        for (const record of this.wmf.records) {
            if (isEscape(record)) {
                const escapeFn = `ESACPE_${enums_1.MetafileEscapes[record.escape.escapeFunction]}`;
                if (this[escapeFn]) {
                    this[escapeFn].apply(this, [record.escape]);
                }
                else {
                    console.warn("unsupport escape fn ", enums_1.MetafileEscapes[record.escape.escapeFunction]);
                }
            }
            else {
                if (this[enums_1.RecordType[record.recordFunction]]) {
                    this[enums_1.RecordType[record.recordFunction]].apply(this, [record]);
                }
                else {
                    console.warn("unsupported record", enums_1.RecordType[record.recordFunction]);
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
        if (record.polyFillMode === enums_1.PolyFillMode.ALTERNATE) {
            this.ctx.polyFillRule = "evenodd";
        }
        else if (record.polyFillMode === enums_1.PolyFillMode.WINDING) {
            this.ctx.polyFillRule = "nonzero";
        }
    }
    META_SETMAPMODE(record) {
        console.log("set map mode", enums_1.MapMode[record.mapMode]);
    }
    META_SETBKMODE(record) {
        console.log("set mix mode", enums_1.MixMode[record.BkMode]);
    }
    META_SETROP2(record) {
        console.log("set draw mode", enums_1.BinaryRasterOperation[record.drawMode]);
    }
    META_SELECTOBJECT(record) {
        const obj = this.getObject(record.objectIndex);
        if (obj instanceof structs_1.Pen) {
            this.ctx.pen = obj;
        }
        else if (obj instanceof structs_1.LogBrush) {
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
    META_ARC(record) {
        const { leftRect, rightRect, topRect, bottomRect, xStartArc, yStartArc, xEndArc, yEndArc } = record;
        const cx = (leftRect + rightRect) / 2;
        const cy = (topRect + bottomRect) / 2;
        const rx = (rightRect - leftRect) / 2;
        const ry = (bottomRect - topRect) / 2;
        const sx = xStartArc - cx;
        const sy = cy - yStartArc;
        const stAngle = (0, utils_1.centerAngle)(sx, sy);
        const ex = xEndArc - cx;
        const ey = cy - yEndArc;
        const enAngle = (0, utils_1.centerAngle)(ex, ey);
        let swAngle = enAngle - stAngle;
        while (swAngle < 0) {
            swAngle += Math.PI * 2;
        }
        console.log(stAngle / Math.PI * 180);
        console.log(enAngle / Math.PI * 180);
        this.drawArc({
            cx, cy, rx, ry,
            stAngle: stAngle,
            swAngle,
        });
    }
}
exports.BasicPlayback = BasicPlayback;
