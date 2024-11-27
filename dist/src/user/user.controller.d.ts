import { SignUpDto, UpdateUserDto, UpgradeSubscriptionPlanDto } from '../common/dto';
import { UserService } from './user.service';
import { GetDashboardOutput, GetUserProfileOutput } from '../common';
import { Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signUp(dto: SignUpDto): Promise<{
        message: string;
    }>;
    getProfile(req: Request): Promise<GetUserProfileOutput>;
    updateProfile(dto: UpdateUserDto, req: Request): Promise<GetUserProfileOutput>;
    upgradeSubscription(dto: UpgradeSubscriptionPlanDto, req: Request): Promise<{
        message: string;
    }>;
    getUserDashboard(req: Request): Promise<GetDashboardOutput>;
}
