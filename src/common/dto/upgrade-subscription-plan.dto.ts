import { IsEnum } from "class-validator";
import { Subscription } from "../enum";

export class UpgradeSubscriptionPlanDto {
    @IsEnum(Subscription)
    newPlan: Subscription;
}
