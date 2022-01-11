var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Rect } from "../structs/Rect";
import { LiteralType, serialize } from "../decorators";
import { Serializable } from "../Serializable";
export class META_PLACEABLE extends Serializable {
    constructor() {
        super(...arguments);
        this.byteSize = 22;
        this.key = 0x9AC6CDD7;
        this.HWmf = 0x0000;
        this.boundingBox = new Rect();
        this.inch = 1200;
        this.reserved = 0x00000000;
        this.checksum = 0;
    }
}
__decorate([
    serialize(LiteralType.uint32),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "key", void 0);
__decorate([
    serialize(LiteralType.int16),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "HWmf", void 0);
__decorate([
    serialize(),
    __metadata("design:type", Rect)
], META_PLACEABLE.prototype, "boundingBox", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "inch", void 0);
__decorate([
    serialize(LiteralType.uint32),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "reserved", void 0);
__decorate([
    serialize(LiteralType.int16),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "checksum", void 0);
