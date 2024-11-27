"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const url_module_1 = require("./url/url.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const redirection_module_1 = require("./redirection/redirection.module");
const subscription_module_1 = require("./subscription/subscription.module");
const custom_domain_redirection_module_1 = require("./custom-domain-redirection/custom-domain-redirection.module");
const cronjob_module_1 = require("./cronjob/cronjob.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot(),
            url_module_1.UrlModule,
            mongoose_1.MongooseModule.forRoot("mongodb://localhost:27017/urlshortener"),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            redirection_module_1.RedirectionModule,
            subscription_module_1.SubscriptionModule,
            custom_domain_redirection_module_1.CustomDomainRedirectionModule,
            cronjob_module_1.CronjobModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map