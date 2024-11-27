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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../common/dto");
const user_service_1 = require("./user.service");
const common_2 = require("../common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    signUp(dto) {
        return this.userService.signUp(dto);
    }
    getProfile(req) {
        const { user } = req.headers;
        return this.userService.getProfile(user);
    }
    updateProfile(dto, req) {
        const { user } = req.headers;
        return this.userService.updateProfile(user, dto);
    }
    upgradeSubscription(dto, req) {
        const { user } = req.headers;
        return this.userService.upgradeSubscription(user, dto);
    }
    getUserDashboard(req) {
        const { user } = req.headers;
        return this.userService.getUserDashboard(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('upgrade'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpgradeSubscriptionPlanDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "upgradeSubscription", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDashboard", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map