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
exports.SETMITERLIMIT = void 0;
const Serializable_1 = require("../Serializable");
const decorators_1 = require("../decorators");
const enums_1 = require("../enums");
class SETMITERLIMIT extends Serializable_1.SerializableEscape {
    constructor() {
        super(...arguments);
        this.escapeFunction = enums_1.MetafileEscapes.SETMITERLIMIT;
        this.miterLimit = 4;
    }
    get byteCount() {
        return this.escapeData.byteLength;
    }
    get escapeData() {
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);
        view.setInt32(0, this.miterLimit, true);
        return buf;
    }
    ;
    set escapeData(buf) {
        const view = new DataView(buf);
        this.miterLimit = view.getUint32(0, true);
    }
}
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], SETMITERLIMIT.prototype, "escapeFunction", void 0);
__decorate([
    decorators_1.readonly,
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], SETMITERLIMIT.prototype, "byteCount", null);
__decorate([
    (0, decorators_1.serialize)(),
    __metadata("design:type", ArrayBuffer),
    __metadata("design:paramtypes", [ArrayBuffer])
], SETMITERLIMIT.prototype, "escapeData", null);
exports.SETMITERLIMIT = SETMITERLIMIT;
