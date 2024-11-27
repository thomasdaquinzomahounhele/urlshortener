import { Subscription } from "../enum";
export declare class UserDto {
    id: string;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    hashedpassword: string;
    subscription: Subscription;
}
