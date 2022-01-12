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
exports.META_EOF = void 0;
const Serializable_1 = require("../Serializable");
const decorators_1 = require("../decorators");
const enums_1 = require("../enums");
class META_EOF extends Serializable_1.SerializableRecord {
    constructor() {
        super(...arguments);
        this.recordFunction = enums_1.RecordType.META_EOF;
    }
    get recordSize() {
        return 6 / Serializable_1.BYTE_PER_WORD;
    }
    ;
}
__decorate([
    decorators_1.readonly,
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint32),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], META_EOF.prototype, "recordSize", null);
__decorate([
    (0, decorators_1.serialize)(decorators_1.LiteralType.uint16),
    __metadata("design:type", Number)
], META_EOF.prototype, "recordFunction", void 0);
exports.META_EOF = META_EOF;
