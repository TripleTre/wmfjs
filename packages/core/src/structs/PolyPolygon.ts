import { Serializable } from "../Serializable";
import { LiteralType, readonly, serialize } from "../decorators";
import { PointS } from "./PointS";

export class PolyPolygon extends Serializable {

    public polygons: PointS[][] = [];

    public constructor(init?: PointS[][]) {
        super();
        this.polygons = init || [];
    }

    @readonly
    public get byteSize(): number {
        return this.aPoints.length * 4 + this.aPointsPerPolygon.length * 2 + 2;
    };

    @serialize(LiteralType.uint16)
    public get numberOfPolygons(): number {
        return this.polygons.length;
    }
    public set numberOfPolygons(value: number) {
        this.polygons = new Array(value).fill([]);
    }

    @serialize({ collection: Array, element: LiteralType.uint16 })
    public get aPointsPerPolygon(): number[] {
        return this.polygons.map(v => v.length);
    }
    public set aPointsPerPolygon(value: number[]) {
        for (let i = 0, len = value.length; i < len; i++) {
            this.polygons[i] = new Array(value[i]).fill("").map(() => new PointS());
        }
    }

    @serialize({ collection: Array, element: PointS })
    public get aPoints(): PointS[] {
        return this.polygons.reduce((result, next) => {
            result = result.concat(next);
            return result;
        }, []);
    }
    public set aPoints(value: PointS[]) {
        let c = 0;
        for (let i = 0; i < this.polygons.length; i++) {
            const polygon = this.polygons[i];
            for (let j = 0; j < polygon.length; j++) {
                polygon[j] = value[c];
                c ++;
            }
        }
    }
}
