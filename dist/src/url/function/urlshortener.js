"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlshortener = void 0;
const crypto_1 = require("crypto");
const common_1 = require("../../common");
const urlshortener = (subscription, dto, id) => {
    const randomString = generateRandomString(8);
    let shorturl;
    if (subscription == common_1.Subscription.Premium) {
        shorturl = `localhost:3001/${dto.customDomain}-${randomString}`;
    }
    else {
        shorturl = `localhost:3001/urlshortener/${randomString}`;
    }
    return {
        shortUrl: shorturl,
        message: `Url successfully shortened !! Get it at: localhost:3001/url/${id}`
    };
};
exports.urlshortener = urlshortener;
function generateRandomString(length) {
    const randomByte = (0, crypto_1.randomBytes)(Math.ceil(length / 2)).toString('hex');
    return randomByte.slice(0, length);
}
//# sourceMappingURL=urlshortener.js.map