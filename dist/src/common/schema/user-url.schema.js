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
exports.UserUrlSchema = exports.UserUrl = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const url_schema_1 = require("./url.schema");
let UserUrl = class UserUrl {
};
exports.UserUrl = UserUrl;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], UserUrl.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [url_schema_1.UrlSchema] }),
    __metadata("design:type", Array)
], UserUrl.prototype, "urls", void 0);
exports.UserUrl = UserUrl = __decorate([
    (0, mongoose_1.Schema)()
], UserUrl);
exports.UserUrlSchema = mongoose_1.SchemaFactory.createForClass(UserUrl);
//# sourceMappingURL=user-url.schema.js.map