import { BinaryRasterOperation, MapMode, MetafileEscapes, MixMode, PolyFillMode } from "./enums";
import { LogBrush, Pen, PointS } from "./structs";
import { RecordsData } from "./parser";
export interface IPlayback {
    init(recordsData: RecordsData): void;
    /**
     * set the horizontal and vertical extents of the output window
     * @param x defines the horizontal extent of the window in logical units
     * @param y defines the vertical extent of the window in logical units
     */
    META_SETWINDOWEXT(x: number, y: number): void;
    /**
     * defines the output window origin
     * @param x defines the y-coordinate, in logical units
     * @param y defines the x-coordinate, in logical units
     */
    META_SETWINDOWORG(x: number, y: number): void;
    /**
     * defines the mapping mode in the playback device context. The mapping mode defines the unit
     * of measure used to transform page-space units into device-space units, and also defines
     * the orientation of the device's x and y axes.
     * @param mode defines the mapping mode
     */
    META_SETMAPMODE(mode: MapMode): void;
    /**
     * defines the background raster operation mix mode in the playback device context.
     * The background mix mode is the mode for combining pens, text, hatched brushes,
     * and interiors of filled objects with background colors on the output surface.
     * @param mode defines background mix mode
     */
    META_SETBKMODE(mode: MixMode): void;
    /**
     * sets polygon fill mode in the playback device context for graphics operations that fill polygons.
     * @param mode defines polygon fill mode
     */
    META_SETPOLYFILLMODE(mode: PolyFillMode): void;
    /**
     * defines text-alignment values in the playback device context.
     * @param alignFlag
     */
    META_SETTEXTALIGN(alignFlag: number): void;
    /**
     * defines the text foreground color in the playback device context.
     * @param colorRef ColorRef Object that defines the color value.
     */
    META_SETTEXTCOLOR(colorRef: number): void;
    /**
     * defines the foreground raster operation mix mode in the playback device context.
     * The foreground mix mode is the mode for combining pens and interiors of filled objects
     * with foreground colors on the output surface.
     * @param drawMode
     * @constructor
     */
    META_SETROP2(drawMode: BinaryRasterOperation): void;
    /**
     * specifies extensions to WMF functionality that are not directly available through other records
     * defined in the RecordType Enumeration. The MetafileEscapes Enumeration lists these extensions.
     * @param fn defines the escape function. The value MUST be from the MetafileEscapes Enumeration.
     * @param data An array of bytes.
     */
    META_ESCAPE(fn: MetafileEscapes, data: ArrayBuffer): void;
    /**
     * creates a Pen Object
     * @param pen Pen Object data that defines the pen to create.
     */
    META_CREATEPENINDIRECT(pen: Pen): void;
    /**
     * specifies a graphics object for the playback device context. The new object replaces the previous
     * object of the same type, unless if the previous object is a palette object.
     * @param index index into the WMF Object Table to get the object to be selected.
     */
    META_SELECTOBJECT(index: number): void;
    /**
     * creates a Brush Object from a LogBrush Object.
     * @param logBrush LogBrush Object data that defines the brush to create.
     */
    META_CREATEBRUSHINDIRECT(logBrush: LogBrush): void;
    /**
     * deletes an object, including the Bitmap16 Object, Brush Object, DeviceIndependentBitmap Object,
     * Font Object, Palette Object, Pen Object, and Region Object. After the object is deleted,
     * its index in the WMF Object Table is no longer valid but is available to be reused.
     * @param index index into the WMF Object Table to get the object to be deleted.
     */
    META_DELETEOBJECT(index: number): void;
    /**
     * indicates the end of the WMF metafile.
     */
    META_EOF(): void;
    /**
     * paints a polygon consisting of two or more vertices connected by straight lines.
     * The polygon is outlined by using the pen and filled by using the brush and polygon
     * fill mode that are defined in the playback device context.
     * @param points
     */
    META_POLYGON(points: PointS[]): void;
    /**
     * sets the limit for the length of miter joins to use in subsequent graphics operations.
     * @param limit specifies the miter limit
     */
    SETMITERLIMIT(limit: number): void;
}
export interface IPlaybackCtx {
    pen: Pen;
    brush: LogBrush;
    textAlign: number;
    textColor: number;
    polyFillRule: "evenodd" | "nonzero";
    miterLimit: number;
    backgroundColor?: number;
}
