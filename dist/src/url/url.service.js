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
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const function_1 = require("./function");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../common/schema");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const validator_1 = require("validator");
const common_2 = require("../common");
const user_service_1 = require("../user/user.service");
let UrlService = class UrlService {
    constructor(urlShortener, urlModel, userUrlModel, userService) {
        this.urlShortener = urlShortener;
        this.urlModel = urlModel;
        this.userUrlModel = userUrlModel;
        this.userService = userService;
    }
    async findOneUrl(id) {
        const url = await this.urlModel.findOne({ id: id });
        return url;
    }
    async findUserUrls(userId) {
        const userUrls = await this.userUrlModel.findOne({ userId });
        return userUrls;
    }
    async isAllowed(userId, subscription) {
        const userUrls = await this.findUserUrls(userId);
        if (!userUrls) {
            return true;
        }
        ;
        if (subscription == common_2.Subscription.Free) {
            if (userUrls.urls.length >= common_2.TotalLinks.Free) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (subscription == common_2.Subscription.Intermediate) {
            if (userUrls.urls.length >= common_2.TotalLinks.Intermediate) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (subscription == common_2.Subscription.Premium) {
            if (userUrls.urls.length >= common_2.TotalLinks.Premium) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    async createShortenedUrl(dto, user) {
        const { sub } = user;
        const { subscription } = await this.userService.findOneByUserId(sub);
        const isAllowed = await this.isAllowed(sub, subscription);
        if (isAllowed === false) {
            return {
                message: "You have reached the limit of short links you can create this month !! Upgrade your subscription plan for more. See our offers here: localhost:3001/subscription"
            };
        }
        if (validator_1.default.isURL(dto.longUrl)) {
            const id = (0, uuid_1.v4)();
            const { shortUrl, message } = this.urlShortener(subscription, dto, id);
            await this.urlModel.insertMany({
                id: id,
                longUrl: dto.longUrl,
                shortUrl: shortUrl,
                clickCount: 0,
                createdAt: new Date(),
                createdBy: sub
            });
            const Url = await this.findOneUrl(id);
            await this.updateUserUrlsWithNewUrl(sub, Url);
            return { message };
        }
        else {
            throw new common_1.NotAcceptableException("Please enter a valid url", { description: "Verify if you copied the whole link. If you did !! Verify if your url actually works and directs to a website" });
        }
    }
    async getShortenedUrl(id) {
        const url = await this.urlModel.findOne({ id: id });
        return { shortUrl: url.shortUrl };
    }
    async incrementClickCount(param) {
        const normalShortUrl = `localhost:3001/urlshortener/${param}`;
        const customShortUrl = `localhost:3001/${param}`;
        const normalUrl = await this.urlModel.findOne({ shortUrl: normalShortUrl });
        const customUrl = await this.urlModel.findOne({ shortUrl: customShortUrl });
        let createdBy;
        let clickCount;
        let updatedUrl;
        if (normalUrl) {
            ({ clickCount, createdBy } = normalUrl);
            updatedUrl = await this.urlModel.findOneAndUpdate({ shortUrl: normalShortUrl }, { clickCount: clickCount + 1 }, { new: true });
        }
        if (customUrl) {
            ({ clickCount, createdBy } = customUrl);
            updatedUrl = await this.urlModel.findOneAndUpdate({ shortUrl: customShortUrl }, { clickCount: clickCount + 1 }, { new: true });
        }
        await this.updateUserUrlsClickCount(createdBy, updatedUrl);
        return updatedUrl;
    }
    async updateUserUrlsWithNewUrl(userId, url) {
        const existingUser = await this.findUserUrls(userId);
        if (existingUser) {
            let updatedUrls = [...existingUser.urls];
            updatedUrls.push(url);
            return await this.userUrlModel.findOneAndUpdate({ userId: userId }, { $set: {
                    urls: updatedUrls
                }
            }, { new: true });
        }
        else {
            await this.userUrlModel.insertMany({
                userId: userId,
                urls: [url],
            });
            const userUrls = await this.userUrlModel.findOne({ userId: userId });
            return userUrls;
        }
    }
    async updateUserUrls(userId, urls) {
        return await this.userUrlModel.findOneAndUpdate({ userId: userId }, { $set: {
                urls: urls
            }
        }, { new: true });
    }
    async updateUserUrlsClickCount(userId, url) {
        const userUrls = await this.findUserUrls(userId);
        const index = userUrls.urls.findIndex((element) => (element.id == url.id));
        userUrls.urls[index] = url;
        return await this.userUrlModel.findOneAndUpdate({ userId: userId }, { $set: {
                urls: userUrls.urls
            }
        }, { new: true });
    }
    async cleanUp(args) {
        await this.urlModel.deleteMany(args);
    }
    async findAllUserUrls() {
        const userUrls = await this.userUrlModel.find({});
        return userUrls;
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(function_1.FUNCTION)),
    __param(1, (0, mongoose_1.InjectModel)(schema_1.Url.name)),
    __param(2, (0, mongoose_1.InjectModel)(schema_1.UserUrl.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [Function, mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService])
], UrlService);
//# sourceMappingURL=url.service.js.map