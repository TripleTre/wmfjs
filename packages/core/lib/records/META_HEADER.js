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
import { MetafileType, MetafileVersion } from "../enums";
import { LiteralType, serialize } from "../decorators";
export class META_HEADER extends Serializable {
    constructor() {
        super(...arguments);
        this.byteSize = 18;
        this.type = MetafileType.DISKMETAFILE;
        this.headerSize = 18;
        this.version = MetafileVersion.META_VERSION300;
        this.sizeLow = 0;
        this.sizeHigh = 0;
        this.numberOfObjects = 0;
        this.maxRecord = 0;
        this.numberOfMembers = 0x0000;
    }
}
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "type", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "headerSize", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "version", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "sizeLow", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "sizeHigh", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "numberOfObjects", void 0);
__decorate([
    serialize(LiteralType.uint32),
    __metadata("design:type", Number)
], META_HEADER.prototype, "maxRecord", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "numberOfMembers", void 0);
