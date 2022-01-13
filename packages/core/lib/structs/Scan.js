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
exports.Scan = void 0;
const Serializable_1 = require("../Serializable");
const decorators_1 = require("../decorators");
const ScanLine_1 = require("./ScanLine");
class Scan extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.top = 0;
        this.bottom = 0;
        this.scanLines = [];
    }
    get byteSize() {
        return 2 + 2 + 2 + this.scanLines.length * 4;
    }
    ;
    get count() {
        return this.scanLines.length / 2;
    }
    ;
    get count2() {
        return this.count;
    }
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Scan.prototype, "byteSize", null);
__decorate([
    decorators_1.readonly,
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Scan.prototype, "count", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], Scan.prototype, "top", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], Scan.prototype, "bottom", void 0);
__decorate([
    (0, decorators_1.serialize)({ collection: Array, element: ScanLine_1.ScanLine }),
    __metadata("design:type", Array)
], Scan.prototype, "scanLines", void 0);
__decorate([
    decorators_1.readonly,
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Scan.prototype, "count2", null);
exports.Scan = Scan;
