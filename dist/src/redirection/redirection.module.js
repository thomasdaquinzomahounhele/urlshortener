"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectionModule = void 0;
const common_1 = require("@nestjs/common");
const redirection_controller_1 = require("./redirection.controller");
const redirection_service_1 = require("./redirection.service");
const url_module_1 = require("../url/url.module");
let RedirectionModule = class RedirectionModule {
};
exports.RedirectionModule = RedirectionModule;
exports.RedirectionModule = RedirectionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            url_module_1.UrlModule,
        ],
        controllers: [redirection_controller_1.RedirectionController],
        providers: [redirection_service_1.RedirectionService]
    })
], RedirectionModule);
//# sourceMappingURL=redirection.module.js.map