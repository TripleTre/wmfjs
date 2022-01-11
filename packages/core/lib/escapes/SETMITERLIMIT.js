var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SerializableEscape } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { MetafileEscapes } from "../enums";
export class SETMITERLIMIT extends SerializableEscape {
    constructor() {
        super(...arguments);
        this.escapeFunction = MetafileEscapes.SETMITERLIMIT;
        this.miterLimit = 5;
    }
    get byteCount() {
        return this.escapeData.byteLength;
    }
    set byteCount(v) { }
    get escapeData() {
        const buf = new Int32Array(1);
        buf[0] = this.miterLimit;
        return buf.buffer;
    }
    ;
    set escapeData(buf) {
        const view = new DataView(buf);
        this.miterLimit = view.getUint32(0, true);
    }
    get byteSize() {
        return 2 + 2 + this.escapeData.byteLength;
    }
}
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], SETMITERLIMIT.prototype, "escapeFunction", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SETMITERLIMIT.prototype, "byteCount", null);
__decorate([
    serialize(),
    __metadata("design:type", ArrayBuffer),
    __metadata("design:paramtypes", [ArrayBuffer])
], SETMITERLIMIT.prototype, "escapeData", null);
