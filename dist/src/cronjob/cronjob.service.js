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
var CronjobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const url_service_1 = require("../url/url.service");
let CronjobService = CronjobService_1 = class CronjobService {
    constructor(urlService) {
        this.urlService = urlService;
        this.logger = new common_1.Logger(CronjobService_1.name);
    }
    async handleCleanUpCron() {
        this.logger.debug('Midnight clean up');
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        this.urlService.cleanUp({
            createdAt: { $lt: thirtyDaysAgo }, clickCount: { $lt: 10 },
        });
        const userUrls = await this.urlService.findAllUserUrls();
        for (const userUrl of userUrls) {
            const updatedUserUrls = userUrl.urls.filter(url => !(url.createdAt < thirtyDaysAgo && url.clickCount < 10));
            await this.urlService.updateUserUrls(userUrl.userId, updatedUserUrls);
        }
    }
};
exports.CronjobService = CronjobService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'Clean up' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobService.prototype, "handleCleanUpCron", null);
exports.CronjobService = CronjobService = CronjobService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], CronjobService);
//# sourceMappingURL=cronjob.service.js.map