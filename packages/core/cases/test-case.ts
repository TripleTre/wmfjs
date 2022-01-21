import * as fs from "fs";
import {
    BinaryRasterOperation,
    FloodFill,
    HatchStyle,
    MapMode, META_ARC,
    META_CREATEBRUSHINDIRECT,
    META_CREATEPENINDIRECT, META_CREATEREGION,
    META_EOF,
    META_ESCAPE, META_FILLREGION, META_LINETO, META_PIE,
    META_PLACEABLE, META_POLYGON, META_RECTANGLE, META_ROUNDRECT,
    META_SETBKMODE,
    META_SETMAPMODE,
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
wmf.placeable.boundingBox.right = 2400;
wmf.placeable.boundingBox.bottom = 2400;

const ext = new META_SETWINDOWEXT();
ext.x = 2400;
ext.y = 2400;
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

// const pen1 = new META_CREATEPENINDIRECT();
// pen1.pen.penStyle = 5;
// pen1.pen.width.x = 5;
// pen1.pen.colorRef.r = 55;
// pen1.pen.colorRef.g = 55;
// pen1.pen.colorRef.b = 55;
// wmf.records.push(pen1);

const pen2 = new META_CREATEPENINDIRECT();
pen2.pen.penStyle = 0;
pen2.pen.width.x = 20;
pen2.pen.colorRef = strokeColor;
wmf.records.push(pen2);

wmf.records.push(selectObject(0));

const brush = new META_CREATEBRUSHINDIRECT();
brush.logBrush.brushStyle = 0;
brush.logBrush.brushHatch = HatchStyle.HS_HORIZONTAL;
brush.logBrush.colorRef = fillColor;
wmf.records.push(brush);

wmf.records.push(selectObject(1));

(function draw() {
    const arc = new META_ARC();
    arc.xEndArc = 2400;
    arc.yEndArc = 0;
    arc.xStartArc = 2400;
    arc.yStartArc = 2400;
    arc.topRect = 0;
    arc.bottomRect = 2400;
    arc.leftRect = 0;
    arc.rightRect = 2400;
    wmf.records.push(arc);
})();

wmf.records.push(deleteObject(2));
wmf.records.push(deleteObject(1));
wmf.records.push(deleteObject(0));

wmf.records.push(new META_EOF());

const buf = wmf.serialize();

fs.writeFileSync(path.resolve(__dirname, "./output.wmf"), Buffer.from(buf));
console.log(wmf.header.numberOfObjects);
console.log(wmf.placeable.checksum);
