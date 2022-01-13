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
exports.Region = void 0;
const Serializable_1 = require("../Serializable");
const decorators_1 = require("../decorators");
const Scan_1 = require("./Scan");
class Region extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.nextInChain = 0;
        this.objectType = 0x0006;
        this.objectCount = 0;
        this.aScans = [];
    }
    get byteSize() {
        return 14 + this.aScans.reduce((result, next) => {
            result += next.byteSize;
            return result;
        }, 0);
    }
    ;
    get regionSize() {
        return this.aScans.reduce((result, next) => {
            result += next.byteSize;
            return result;
        }, 0);
    }
    ;
    get scanCount() {
        return this.aScans.length;
    }
    ;
    set scanCount(v) {
        if (this.aScans.length === 0) {
            for (let i = 0; i < v; i++) {
                this.aScans.push(new Scan_1.Scan());
            }
        }
    }
    ;
    get maxScan() {
        return this.aScans.sort((a, b) => a.scanLines.length - b.scanLines.length)[0].scanLines.length;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Region.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], Region.prototype, "nextInChain", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number)
], Region.prototype, "objectType", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint32),
    __metadata("design:type", Number)
], Region.prototype, "objectCount", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Region.prototype, "regionSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Region.prototype, "scanCount", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.int16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Region.prototype, "maxScan", null);
exports.Region = Region;
