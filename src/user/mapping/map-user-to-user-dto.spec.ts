import { 
    Subscription, 
    TEST_EMAIL, 
    TEST_FIRST_NAME, 
    TEST_LAST_NAME, 
    TEST_PASSWORD, 
    TEST_USER_ID, 
    User, 
    UserDto 
} from "../../common";
import { mapUserToUserDto } from "./map-user-to-user-dto";

describe("mapUserToUserDto", () => {
    const user: User = {
        userId: TEST_USER_ID,
        firstname: TEST_FIRST_NAME,
        lastname: TEST_LAST_NAME,
        email: TEST_EMAIL,
        hashedpassword: TEST_PASSWORD,
        subscription: Subscription.Free
    };
    test('returns UserDto', async() => {
        const dto: UserDto = mapUserToUserDto(user);
        expect(dto).toEqual({
            id: undefined,
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashedpassword: user.hashedpassword,
            subscription: user.subscription
        });
    });
});
