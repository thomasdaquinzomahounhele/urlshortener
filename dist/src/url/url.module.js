"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModule = void 0;
const common_1 = require("@nestjs/common");
const url_controller_1 = require("./url.controller");
const url_service_1 = require("./url.service");
const function_1 = require("./function");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../common/schema");
const user_module_1 = require("../user/user.module");
let UrlModule = class UrlModule {
};
exports.UrlModule = UrlModule;
exports.UrlModule = UrlModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: schema_1.Url.name,
                    schema: schema_1.UrlSchema
                },
                {
                    name: schema_1.UserUrl.name,
                    schema: schema_1.UserUrlSchema
                }
            ]),
        ],
        controllers: [url_controller_1.UrlController],
        providers: [
            url_service_1.UrlService,
            {
                provide: function_1.FUNCTION,
                useValue: function_1.urlshortener
            }
        ],
        exports: [
            url_service_1.UrlService,
        ]
    })
], UrlModule);
//# sourceMappingURL=url.module.js.map