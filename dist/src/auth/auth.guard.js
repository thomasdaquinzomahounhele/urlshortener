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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const extract_token_from_header_1 = require("./extract-token-from-header");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const common_2 = require("../common");
const fixtures_1 = require("../../test/fixtures");
let AuthGuard = class AuthGuard {
    constructor(jwtService, configService, reflector) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(common_2.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = (0, extract_token_from_header_1.extractTokenFromHeader)(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            if (token == common_2.TEST_JWT_TOKEN) {
                request.headers['user'] = { sub: fixtures_1.E2E_TEST_USER.userId };
                return true;
            }
            const secret = await this.configService.get('JWT_SECRET');
            const payload = await this.jwtService.verifyAsync(token, {
                secret: secret,
            });
            request.headers['user'] = payload;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map