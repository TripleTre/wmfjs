var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SerializableRecord } from "../Serializable";
import { LiteralType, serialize } from "../decorators";
import { RecordType } from "../enums";
export class META_DELETEOBJECT extends SerializableRecord {
    constructor() {
        super(...arguments);
        this.recordSize = 8;
        this.recordFunction = RecordType.META_DELETEOBJECT;
        this.objectIndex = 0;
    }
}
__decorate([
    serialize(LiteralType.uint32),
    __metadata("design:type", Number)
], META_DELETEOBJECT.prototype, "recordSize", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_DELETEOBJECT.prototype, "recordFunction", void 0);
__decorate([
    serialize(LiteralType.uint16),
    __metadata("design:type", Number)
], META_DELETEOBJECT.prototype, "objectIndex", void 0);
