var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Serializable } from "../Serializable";
import { PenStyle } from "../enums";
import { LiteralType, serialize } from "../decorators";
import { PointS } from "./PointS";
import { ColorRef } from "./ColorRef";
export class Pen extends Serializable {
    constructor() {
        super(...arguments);
        this.byteSize = 8;
        this.penStyle = PenStyle.PS_NULL;
        this.width = new PointS();
        this.colorRef = new ColorRef();
    }
}
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], Pen.prototype, "penStyle", void 0);
__decorate([
    serialize(),
    __metadata("design:type", PointS)
], Pen.prototype, "width", void 0);
__decorate([
    serialize(),
    __metadata("design:type", ColorRef)
], Pen.prototype, "colorRef", void 0);
