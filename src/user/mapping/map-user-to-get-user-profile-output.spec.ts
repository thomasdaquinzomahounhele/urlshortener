import { 
    GetUserProfileOutput,
    Subscription, 
    TEST_EMAIL, 
    TEST_FIRST_NAME, 
    TEST_LAST_NAME 
} from "../../common";
import { mapUserToGetUserProfileOutput } from "./map-user-to-get-user-profile-output";

describe('mapUserToGetUserProfileOutput', () => {
    const user = {
        firstname: TEST_FIRST_NAME,
        lastname: TEST_LAST_NAME,
        email: TEST_EMAIL,
        subscription: Subscription.Free
    };
    test("returns GetUserProfileOutput", async() => {
        const profileOutput: GetUserProfileOutput = mapUserToGetUserProfileOutput(user);
        expect(profileOutput).toEqual({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            subscriptionPlan: user.subscription
        });
    });
});
