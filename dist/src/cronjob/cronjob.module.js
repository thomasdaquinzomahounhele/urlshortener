"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobModule = void 0;
const common_1 = require("@nestjs/common");
const cronjob_service_1 = require("./cronjob.service");
const url_module_1 = require("../url/url.module");
let CronjobModule = class CronjobModule {
};
exports.CronjobModule = CronjobModule;
exports.CronjobModule = CronjobModule = __decorate([
    (0, common_1.Module)({
        imports: [url_module_1.UrlModule],
        providers: [cronjob_service_1.CronjobService]
    })
], CronjobModule);
//# sourceMappingURL=cronjob.module.js.map