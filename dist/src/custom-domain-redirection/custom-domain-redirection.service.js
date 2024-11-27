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
exports.CustomDomainRedirectionService = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("../url/url.service");
let CustomDomainRedirectionService = class CustomDomainRedirectionService {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async redirect(param) {
        const { longUrl } = await this.urlService.incrementClickCount(param);
        return { longUrl };
    }
};
exports.CustomDomainRedirectionService = CustomDomainRedirectionService;
exports.CustomDomainRedirectionService = CustomDomainRedirectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], CustomDomainRedirectionService);
//# sourceMappingURL=custom-domain-redirection.service.js.map