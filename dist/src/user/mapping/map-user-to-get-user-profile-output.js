"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToGetUserProfileOutput = void 0;
const mapUserToGetUserProfileOutput = (user) => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        subscriptionPlan: user.subscription,
    };
};
exports.mapUserToGetUserProfileOutput = mapUserToGetUserProfileOutput;
//# sourceMappingURL=map-user-to-get-user-profile-output.js.map