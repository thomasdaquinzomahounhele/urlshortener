"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToUserDto = void 0;
const class_transformer_1 = require("class-transformer");
const common_1 = require("../../common");
const mapUserToUserDto = (user) => {
    return (0, class_transformer_1.plainToClass)(common_1.UserDto, {
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        hashedpassword: user.hashedpassword,
        subscription: user.subscription,
    }, {
        excludeExtraneousValues: true,
    });
};
exports.mapUserToUserDto = mapUserToUserDto;
//# sourceMappingURL=map-user-to-user-dto.js.map