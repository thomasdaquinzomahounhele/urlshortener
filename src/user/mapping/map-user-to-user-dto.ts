import { plainToClass } from "class-transformer";
import { User, UserDto } from "src/common";

export const mapUserToUserDto = (user: User): UserDto => {
    return plainToClass(
        UserDto,
        {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashedpassword: user.hashedpassword,
        },
        {
            excludeExtraneousValues: true,
        }
    )
}
