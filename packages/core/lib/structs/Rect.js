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
exports.Rect = void 0;
const decorators_1 = require("../decorators");
const Serializable_1 = require("../Serializable");
class Rect extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
    }
    get byteSize() {
        return 8;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Rect.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], Rect.prototype, "left", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], Rect.prototype, "top", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], Rect.prototype, "right", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], Rect.prototype, "bottom", void 0);
exports.Rect = Rect;
