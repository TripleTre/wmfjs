import * as fs from "fs";
import {
    BinaryRasterOperation, ColorRef,
    FloodFill,
    HatchStyle,
    MapMode, META_ARC,
    META_CREATEBRUSHINDIRECT,
    META_CREATEPENINDIRECT, META_CREATEREGION,
    META_EOF,
    META_ESCAPE, META_FILLREGION, META_LINETO, META_PIE,
    META_PLACEABLE, META_POLYGON, META_RECTANGLE, META_ROUNDRECT,
    META_SETBKMODE,
    META_SETMAPMODE, META_SETPIXEL,
    META_SETPOLYFILLMODE,
    META_SETROP2,
    META_SETTEXTALIGN,
    META_SETTEXTCOLOR,
    META_SETWINDOWEXT,
    META_SETWINDOWORG,
    MixMode, PointS,
    PolyFillMode, PostScriptJoin,
    WindowsMetaFile
} from "../src";
import { deleteObject, fillColor, mainColor, selectObject, strokeColor } from "./help";
import * as path from "path";
import { SETLINEJOIN, SETMITERLIMIT } from "../src/escapes";
import { META_EXTFLOODFILL } from "../src/records/META_EXTFLOODFILL";
import { META_MOVETO } from "../src/records/META_MOVETO";
import { Region } from "../src/structs/Region";
import { Scan } from "../src/structs/Scan";
import { ScanLine } from "../src/structs/ScanLine";
import { META_POLYLINE } from "../src/records/META_POLYLINE";
import { META_POLYPOLYGON } from "../src/records/META_POLYPOLYGON";
import { PolyPolygon } from "../src/structs/PolyPolygon";


const wmf = new WindowsMetaFile();
wmf.placeable = new META_PLACEABLE();
wmf.placeable.boundingBox.left = 0;
wmf.placeable.boundingBox.top = 0;
wmf.placeable.boundingBox.right = 2000;
wmf.placeable.boundingBox.bottom = 2000;

const ext = new META_SETWINDOWEXT();
ext.x = 2000;
ext.y = 2000;
wmf.records.push(ext);

const origin = new META_SETWINDOWORG();
origin.x = 0;
origin.y = 0;
wmf.records.push(origin);

const mapMode = new META_SETMAPMODE();
mapMode.mapMode = MapMode.MM_ANISOTROPIC;
wmf.records.push(mapMode);

const bkMode = new META_SETBKMODE();
bkMode.BkMode = MixMode.TRANSPARENT;
wmf.records.push(bkMode);

const polyfillMode = new META_SETPOLYFILLMODE();
polyfillMode.polyFillMode = PolyFillMode.WINDING;
wmf.records.push(polyfillMode);

const textAlign = new META_SETTEXTALIGN();
textAlign.textAlignmentMode = 24;
wmf.records.push(textAlign);

const textColor = new META_SETTEXTCOLOR();
textColor.colorRef.r = 100;
textColor.colorRef.g = 100;
textColor.colorRef.b = 100;
wmf.records.push(textColor);

const rop = new META_SETROP2();
rop.drawMode = BinaryRasterOperation.R2_COPYPEN;
wmf.records.push(rop);

const escape = new META_ESCAPE();
const setMiterLimit = new SETMITERLIMIT();
setMiterLimit.miterLimit = 5;
escape.escape = setMiterLimit;
wmf.records.push(escape);

const escape1 = new META_ESCAPE();
const setLineJoin = new SETLINEJOIN();
setLineJoin.join = PostScriptJoin.PostScriptMiterJoin;
escape1.escape = setLineJoin;
wmf.records.push(escape1);

(function brush() {
    const brush = new META_CREATEBRUSHINDIRECT();
    brush.logBrush.brushStyle = 0;
    brush.logBrush.brushHatch = HatchStyle.HS_HORIZONTAL;
    brush.logBrush.colorRef = fillColor;
    wmf.records.push(brush);
    wmf.records.push(selectObject(0));
})();

(function pen() {
    const pen2 = new META_CREATEPENINDIRECT();
    pen2.pen.penStyle = 0x0001;
    pen2.pen.width.x = 20;
    pen2.pen.colorRef = strokeColor;
    wmf.records.push(pen2);
    wmf.records.push(selectObject(1));
})();
(function draw() {
    const polyline = new META_POLYLINE();
    polyline.aPoints = [
        new PointS({ x: 100, y: 100 }),
        new PointS({ x: 1900, y: 100 }),
    ];
    wmf.records.push(polyline);
})();

(function pen() {
    const pen2 = new META_CREATEPENINDIRECT();
    pen2.pen.penStyle = 0x0002;
    pen2.pen.width.x = 20;
    pen2.pen.colorRef = strokeColor;
    wmf.records.push(pen2);
    wmf.records.push(selectObject(2));
})();
(function draw() {
    const polyline = new META_POLYLINE();
    polyline.aPoints = [
        new PointS({ x: 100, y: 300 }),
        new PointS({ x: 1900, y: 300 }),
    ];
    wmf.records.push(polyline);
})();
(function pen() {
    const pen2 = new META_CREATEPENINDIRECT();
    pen2.pen.penStyle = 0x0003;
    pen2.pen.width.x = 20;
    pen2.pen.colorRef = strokeColor;
    wmf.records.push(pen2);
    wmf.records.push(selectObject(3));
})();
(function draw() {
    const polyline = new META_POLYLINE();
    polyline.aPoints = [
        new PointS({ x: 100, y: 500 }),
        new PointS({ x: 1900, y: 500 }),
    ];
    wmf.records.push(polyline);
})();
(function pen() {
    const pen2 = new META_CREATEPENINDIRECT();
    pen2.pen.penStyle = 0x0004;
    pen2.pen.width.x = 20;
    pen2.pen.colorRef = strokeColor;
    wmf.records.push(pen2);
    wmf.records.push(selectObject(4));
})();
(function draw() {
    const polyline = new META_POLYLINE();
    polyline.aPoints = [
        new PointS({ x: 100, y: 700 }),
        new PointS({ x: 1900, y: 700 }),
    ];
    wmf.records.push(polyline);
})();
(function pen() {
    const pen2 = new META_CREATEPENINDIRECT();
    pen2.pen.penStyle = 7;
    pen2.pen.width.x = 20;
    pen2.pen.colorRef = strokeColor;
    wmf.records.push(pen2);
    wmf.records.push(selectObject(5));
})();
(function draw() {
    const polyline = new META_POLYLINE();
    polyline.aPoints = [
        new PointS({ x: 100, y: 900 }),
        new PointS({ x: 1900, y: 900 }),
    ];
    wmf.records.push(polyline);
})();

wmf.records.push(deleteObject(2));
wmf.records.push(deleteObject(1));
wmf.records.push(deleteObject(0));

wmf.records.push(new META_EOF());

const buf = wmf.serialize();

fs.writeFileSync(path.resolve(__dirname, "./output.wmf"), Buffer.from(buf));
console.log(wmf.header.numberOfObjects);
console.log(wmf.placeable.checksum);
