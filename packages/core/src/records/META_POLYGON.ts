import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";
import { PointS } from "../structs/PointS";

export class META_POLYGON extends SerializableRecord {

    @serialize(LiteralType.uint32)
    public get recordSize(): number {
        return 4 + 2 + 2 + (this.numberOfPoints * 4);
    };
    public set recordSize(v: number) {}

    @serialize(LiteralType.uint16)
    public readonly recordFunction: RecordType = RecordType.META_POLYGON;

    @serialize(LiteralType.int16)
    public get numberOfPoints(): number {
        return this.aPoints.length;
    };
    public set numberOfPoints(v: number) {
        if (this.aPoints.length === 0) {
            for (let i = 0; i < v; i++) {
                this.aPoints.push(new PointS());
            }
        }
    }

    @serialize({ collection: Array, element: PointS })
    public aPoints: Array<PointS> = [];
}
