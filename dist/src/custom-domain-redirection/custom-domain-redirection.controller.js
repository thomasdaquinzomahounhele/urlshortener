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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDomainRedirectionController = void 0;
const common_1 = require("@nestjs/common");
const custom_domain_redirection_service_1 = require("./custom-domain-redirection.service");
const common_2 = require("../common");
let CustomDomainRedirectionController = class CustomDomainRedirectionController {
    constructor(customDomainRedirectionService) {
        this.customDomainRedirectionService = customDomainRedirectionService;
    }
    redirect(param) {
        return this.customDomainRedirectionService.redirect(param);
    }
};
exports.CustomDomainRedirectionController = CustomDomainRedirectionController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(':param'),
    __param(0, (0, common_1.Param)('param')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomDomainRedirectionController.prototype, "redirect", null);
exports.CustomDomainRedirectionController = CustomDomainRedirectionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [custom_domain_redirection_service_1.CustomDomainRedirectionService])
], CustomDomainRedirectionController);
//# sourceMappingURL=custom-domain-redirection.controller.js.map