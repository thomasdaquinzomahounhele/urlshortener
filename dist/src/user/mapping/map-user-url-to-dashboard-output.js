"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserUrlToDashboardOutput = void 0;
const mapping_1 = require("../../url/mapping");
const mapUserUrlToDashboardOutput = (subscription, urls) => {
    const UserUrls = urls.map((url) => {
        return (0, mapping_1.mapUrlToUrlDto)(subscription, url);
    });
    return {
        UserUrls: UserUrls,
        message: {
            message: 'Want more control over your short links ? Upgrade your subscription plan',
            seeOurPlans: "click here to see what we have for you: localhost:3001/subscription"
        }
    };
};
exports.mapUserUrlToDashboardOutput = mapUserUrlToDashboardOutput;
//# sourceMappingURL=map-user-url-to-dashboard-output.js.map