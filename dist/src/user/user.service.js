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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../common/schema");
const bcrypt = require("bcrypt");
const mapping_1 = require("./mapping");
const common_2 = require("../common");
const uuid_1 = require("uuid");
const url_service_1 = require("../url/url.service");
const map_user_url_to_dashboard_output_1 = require("./mapping/map-user-url-to-dashboard-output");
let UserService = class UserService {
    constructor(userModel, urlService) {
        this.userModel = userModel;
        this.urlService = urlService;
    }
    async findOneByEmail(email) {
        const user = await this.userModel.findOne({ email });
        const result = user ? (0, mapping_1.mapUserToUserDto)(user) : undefined;
        return result;
    }
    ;
    async findOneByUserId(userId) {
        const user = await this.userModel.findOne({ userId });
        const result = user ? (0, mapping_1.mapUserToUserDto)(user) : undefined;
        return result;
    }
    ;
    async signUp(dto) {
        const { firstname, lastname, email, password } = dto;
        const existingUser = await this.findOneByEmail(email);
        if (existingUser) {
            return { message: "Email address already in use. Please choose a different email" };
        }
        const userId = (0, uuid_1.v4)();
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        await this.userModel.insertMany({
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            hashedpassword: hashedpassword,
            subscription: common_2.Subscription.Free
        });
        return {
            message: 'You have successfully signed up. You can shorten your links right after signing in at localhost:3001/auth/signin'
        };
    }
    ;
    async getProfile(user) {
        const { sub } = user;
        const realUser = await this.findOneByUserId(sub);
        return (0, mapping_1.mapUserToGetUserProfileOutput)(realUser);
    }
    async updateProfile(user, dto) {
        const { sub } = user;
        let updatedUser = await this.userModel.findOneAndUpdate({ userId: sub }, { $set: dto }, { new: true });
        if (dto.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.password, salt);
            const updateUserDto = {
                hashedpassword: hash,
            };
            updatedUser = await this.userModel.findOneAndUpdate({ userId: sub }, { $set: updateUserDto }, { new: true });
        }
        return (0, mapping_1.mapUserToGetUserProfileOutput)((0, mapping_1.mapUserToUserDto)(updatedUser));
    }
    ;
    async upgradeSubscription(user, dto) {
        const { sub } = user;
        await this.userModel.findOneAndUpdate({ userId: sub }, {
            $set: {
                subscription: dto.newPlan,
            },
        }, { new: true });
        return {
            message: `Now you can benefit from all the advantages of the #${dto.newPlan} plan`,
        };
    }
    ;
    async getUserDashboard(user) {
        const { sub } = user;
        const userUrls = await this.urlService.findUserUrls(sub);
        const { subscription } = await this.findOneByUserId(sub);
        return (0, map_user_url_to_dashboard_output_1.mapUserUrlToDashboardOutput)(subscription, userUrls.urls);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => url_service_1.UrlService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        url_service_1.UrlService])
], UserService);
//# sourceMappingURL=user.service.js.map