"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDomainRedirectionModule = void 0;
const common_1 = require("@nestjs/common");
const custom_domain_redirection_controller_1 = require("./custom-domain-redirection.controller");
const custom_domain_redirection_service_1 = require("./custom-domain-redirection.service");
const url_module_1 = require("../url/url.module");
let CustomDomainRedirectionModule = class CustomDomainRedirectionModule {
};
exports.CustomDomainRedirectionModule = CustomDomainRedirectionModule;
exports.CustomDomainRedirectionModule = CustomDomainRedirectionModule = __decorate([
    (0, common_1.Module)({
        imports: [url_module_1.UrlModule],
        controllers: [custom_domain_redirection_controller_1.CustomDomainRedirectionController],
        providers: [custom_domain_redirection_service_1.CustomDomainRedirectionService]
    })
], CustomDomainRedirectionModule);
//# sourceMappingURL=custom-domain-redirection.module.js.map