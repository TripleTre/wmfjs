var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";
import { PointS } from "../structs/PointS";
export class META_POLYGON extends SerializableRecord {
    constructor() {
        super(...arguments);
        this.recordFunction = RecordType.META_POLYGON;
        this.aPoints = [];
    }
    get recordSize() {
        return 4 + 2 + 2 + (this.numberOfPoints * 4);
    }
    ;
    set recordSize(v) { }
    get numberOfPoints() {
        return this.aPoints.length;
    }
    ;
    set numberOfPoints(v) {
        if (this.aPoints.length === 0) {
            for (let i = 0; i < v; i++) {
                this.aPoints.push(new PointS());
            }
        }
    }
}
__decorate([
    serialize(LiteralType.uint32),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], META_POLYGON.prototype, "recordSize", null);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_POLYGON.prototype, "recordFunction", void 0);
__decorate([
    serialize(LiteralType.int16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], META_POLYGON.prototype, "numberOfPoints", null);
__decorate([
    serialize({ collection: Array, element: PointS }),
    __metadata("design:type", Array)
], META_POLYGON.prototype, "aPoints", void 0);
