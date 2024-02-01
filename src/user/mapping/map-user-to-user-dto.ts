import { plainToClass } from "class-transformer";
import { User, UserDto } from "../../common";

export const mapUserToUserDto = (user: User): UserDto => {
    return plainToClass(
        UserDto,
        {
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashedpassword: user.hashedpassword,
            subscription: user.subscription,

        },
        {
            excludeExtraneousValues: true,
        }
    );
}
