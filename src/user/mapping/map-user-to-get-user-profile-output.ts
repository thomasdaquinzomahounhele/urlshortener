import { GetUserProfileOutput, UserDto } from "../../common"

export const mapUserToGetUserProfileOutput = (user: any): GetUserProfileOutput => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        subscriptionPlan: user.subscription,
    };
}
