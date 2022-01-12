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
exports.Pen = void 0;
const Serializable_1 = require("../Serializable");
const enums_1 = require("../enums");
const decorators_1 = require("../decorators");
const PointS_1 = require("./PointS");
const ColorRef_1 = require("./ColorRef");
class Pen extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.penStyle = enums_1.PenStyle.PS_NULL;
        this.width = new PointS_1.PointS();
        this.colorRef = new ColorRef_1.ColorRef();
    }
    get byteSize() {
        return 10;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Pen.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], Pen.prototype, "penStyle", void 0);
__decorate([
    (0, decorators_1.serialize)(),
    __metadata("design:type", PointS_1.PointS)
], Pen.prototype, "width", void 0);
__decorate([
    (0, decorators_1.serialize)(),
    __metadata("design:type", ColorRef_1.ColorRef)
], Pen.prototype, "colorRef", void 0);
exports.Pen = Pen;
