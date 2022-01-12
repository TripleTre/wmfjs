import * as fs from "fs";
import {
    WindowsMetaFile,
    MapMode,
    MixMode,
    PolyFillMode,
    BinaryRasterOperation,
    META_SETWINDOWEXT,
    META_SETWINDOWORG,
    META_SETMAPMODE,
    META_SETBKMODE,
    META_SETPOLYFILLMODE,
    META_SETROP2,
    META_CREATEPENINDIRECT,
    META_CREATEBRUSHINDIRECT,
    HatchStyle,
    META_POLYGON,
    PointS,
    META_EOF,
    META_PLACEABLE,
    META_SETTEXTALIGN,
    RecordType,
    META_SETTEXTCOLOR,
    META_ESCAPE, META_ARC
} from "../src";
import { deleteObject, selectObject } from "./help";
import * as path from "path";
import { SETMITERLIMIT } from "../src/escapes";
import { META_MOVETO } from "../src/records/META_MOVETO";


const wmf = new WindowsMetaFile();
wmf.placeable = new META_PLACEABLE();
wmf.placeable.boundingBox.left = 0;
wmf.placeable.boundingBox.top = 0;
wmf.placeable.boundingBox.right = 2400;
wmf.placeable.boundingBox.bottom = 1200;

const ext = new META_SETWINDOWEXT();
ext.x = 2400;
ext.y = 1200;
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

// const pen1 = new META_CREATEPENINDIRECT();
// pen1.pen.penStyle = 5;
// pen1.pen.width.x = 5;
// pen1.pen.colorRef.r = 55;
// pen1.pen.colorRef.g = 55;
// pen1.pen.colorRef.b = 55;
// wmf.records.push(pen1);

const pen2 = new META_CREATEPENINDIRECT();
pen2.pen.penStyle = 0;
pen2.pen.width.x = 5;
pen2.pen.colorRef.r = 0;
pen2.pen.colorRef.g = 0;
pen2.pen.colorRef.b = 0;
wmf.records.push(pen2);

wmf.records.push(selectObject(0));

const brush = new META_CREATEBRUSHINDIRECT();
brush.logBrush.brushStyle = 0;
brush.logBrush.brushHatch = HatchStyle.HS_HORIZONTAL;
brush.logBrush.colorRef.r = 55;
brush.logBrush.colorRef.g = 55;
brush.logBrush.colorRef.b = 55;
wmf.records.push(brush);

wmf.records.push(selectObject(1));

const arc1 = new META_ARC();
arc1.yEndArc = 4;
arc1.xEndArc = 4;
arc1.yStartArc = 4;
arc1.xStartArc = 1196;
arc1.bottomRect = 1196;
arc1.rightRect = 1196;
arc1.topRect = 4;
arc1.leftRect = 4;
wmf.records.push(arc1);

const arc2 = new META_ARC();
arc2.yEndArc = 4;
arc2.xEndArc = 4;
arc2.yStartArc = 1196;
arc2.xStartArc = 4;
arc2.bottomRect = 1196;
arc2.rightRect = 1196 * 2;
arc2.topRect = 4;
arc2.leftRect = 1196;
wmf.records.push(arc2);

// wmf.records.push(deleteObject(2));
wmf.records.push(deleteObject(1));
wmf.records.push(deleteObject(0));

wmf.records.push(new META_EOF());

const buf = wmf.serialize();

fs.writeFileSync(path.resolve(__dirname, "./output.wmf"), Buffer.from(buf));
console.log(wmf.header.numberOfObjects);
console.log(wmf.placeable.checksum);
