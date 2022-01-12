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
exports.META_HEADER = void 0;
const Serializable_1 = require("../Serializable");
const enums_1 = require("../enums");
const decorators_1 = require("../decorators");
class META_HEADER extends Serializable_1.Serializable {
    constructor() {
        super(...arguments);
        this.type = enums_1.MetafileType.DISKMETAFILE;
        this.headerSize = 18 / Serializable_1.BYTE_PER_WORD;
        this.version = enums_1.MetafileVersion.META_VERSION300;
        this.size = 0;
        this.numberOfObjects = 0;
        this.maxRecord = 0;
        this.numberOfMembers = 0x0000;
    }
    get byteSize() {
        return 18;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], META_HEADER.prototype, "byteSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "type", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "headerSize", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "version", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint32),
    __metadata("design:type", Number)
], META_HEADER.prototype, "size", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "numberOfObjects", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint32),
    __metadata("design:type", Number)
], META_HEADER.prototype, "maxRecord", void 0);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_HEADER.prototype, "numberOfMembers", void 0);
exports.META_HEADER = META_HEADER;
