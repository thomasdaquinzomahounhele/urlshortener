import { IsString } from "class-validator";

export class GetUserProfileOutput {
    firstname: string;
    lastname: string;
    email: string;
    subscriptionPlan: string;
}
