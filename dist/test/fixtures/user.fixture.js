"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2E_TEST_USER = exports.signInDto = exports.upgradeSubscriptionPlanDto = exports.updateUserDto = exports.signUpdto = void 0;
const common_1 = require("../../src/common");
exports.signUpdto = {
    firstname: common_1.TEST_FIRST_NAME,
    lastname: common_1.TEST_LAST_NAME,
    email: common_1.TEST_EMAIL,
    password: common_1.TEST_PASSWORD
};
exports.updateUserDto = {
    email: 'newemail@gmail.com',
    password: "new password"
};
exports.upgradeSubscriptionPlanDto = {
    newPlan: common_1.Subscription.Intermediate,
};
exports.signInDto = {
    email: exports.updateUserDto.email,
    password: exports.updateUserDto.password
};
exports.E2E_TEST_USER = {
    userId: "b9c75441-417f-46ff-b6de-558eba0e98e2"
};
//# sourceMappingURL=user.fixture.js.map