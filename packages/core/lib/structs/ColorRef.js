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
exports.ColorRef = void 0;
const Serializable_1 = require("../Serializable");
const decorators_1 = require("../decorators");
class ColorRef extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.reserved = 0x00;
    }
    get byteSize() {
        return 4;
    }
    ;
    valueOf() {
        return this.r * 0x10000 + this.g * 0x100 + this.b;
    }
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], ColorRef.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint8),
    __metadata("design:type", Number)
], ColorRef.prototype, "r", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint8),
    __metadata("design:type", Number)
], ColorRef.prototype, "g", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint8),
    __metadata("design:type", Number)
], ColorRef.prototype, "b", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint8),
    __metadata("design:type", Number)
], ColorRef.prototype, "reserved", void 0);
exports.ColorRef = ColorRef;
