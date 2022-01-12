"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.META_PLACEABLE = void 0;
const Rect_1 = require("../structs/Rect");
const decorators_1 = require("../decorators");
const Serializable_1 = require("../Serializable");
class META_PLACEABLE extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.key = 0x9AC6CDD7;
        this.HWmf = 0x0000;
        this.boundingBox = new Rect_1.Rect();
        this.inch = 1200;
        this.reserved = 0x00000000;
        this.checksum = 0;
    }
    get byteSize() {
        return 22;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], META_PLACEABLE.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint32),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "key", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "HWmf", void 0);
__decorate([
    (0, decorators_1.serialize)(),
    __metadata("design:type", Rect_1.Rect)
], META_PLACEABLE.prototype, "boundingBox", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "inch", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint32),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "reserved", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], META_PLACEABLE.prototype, "checksum", void 0);
exports.META_PLACEABLE = META_PLACEABLE;
