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
exports.PointS = void 0;
const Serializable_1 = require("../Serializable");
const decorators_1 = require("../decorators");
class PointS extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
    }
    get byteSize() {
        return 4;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], PointS.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], PointS.prototype, "x", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], PointS.prototype, "y", void 0);
exports.PointS = PointS;
