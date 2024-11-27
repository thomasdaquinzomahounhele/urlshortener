"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUrlToUrlDto = void 0;
const common_1 = require("../../common");
const mapUrlToUrlDto = (subscription, url) => {
    if (subscription == common_1.Subscription.Free) {
        return {
            longUrl: url.longUrl,
            shortUrl: url.shortUrl,
            createdAt: url.createdAt
        };
    }
    else {
        return {
            longUrl: url.longUrl,
            shortUrl: url.shortUrl,
            clickCount: url.clickCount,
            createdAt: url.createdAt
        };
    }
};
exports.mapUrlToUrlDto = mapUrlToUrlDto;
//# sourceMappingURL=map-url-to-url-dto.js.map