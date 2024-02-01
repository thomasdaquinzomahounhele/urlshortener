import { IsEnum } from "@nestjs/class-validator";
import { Subscription } from "../enum";

export class SubscriptionDto {
    @IsEnum(Subscription)
    subscription: Subscription
}
