import { IsString } from "class-validator";

export class GetUserProfileOutput {
    // @IsString()
    firstname: string;

    // @IsString()
    lastname: string;

    // @IsString()
    email: string;

    subscriptionPlan: string;
}
