import { 
    SignInDto,
    SignUpDto, 
    Subscription, 
    TEST_EMAIL, 
    TEST_FIRST_NAME, 
    TEST_LAST_NAME, 
    TEST_PASSWORD, 
    UpdateUserDto,
    UpgradeSubscriptionPlanDto
} from "../../src/common";

export const signUpdto: SignUpDto = {
    firstname: TEST_FIRST_NAME,
    lastname: TEST_LAST_NAME,
    email: TEST_EMAIL,
    password: TEST_PASSWORD
};
export const updateUserDto: UpdateUserDto = {
    email: 'newemail@gmail.com',
    password: "new password"
};
export const upgradeSubscriptionPlanDto: UpgradeSubscriptionPlanDto = {
    newPlan: Subscription.Intermediate,
};

export const signInDto: SignInDto = {
    email: updateUserDto.email,
    password: updateUserDto.password
};

export const E2E_TEST_USER = {
    userId: "b9c75441-417f-46ff-b6de-558eba0e98e2"
};
