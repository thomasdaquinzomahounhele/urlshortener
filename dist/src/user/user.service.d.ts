import { Model } from 'mongoose';
import { User } from '../common/schema';
import { GetDashboardOutput, GetUserProfileOutput, SignUpDto, UpdateUserDto, UpgradeSubscriptionPlanDto, UserDto } from '../common';
import { UrlService } from '../url/url.service';
export declare class UserService {
    private userModel;
    private urlService;
    constructor(userModel: Model<User>, urlService: UrlService);
    findOneByEmail(email: string): Promise<UserDto | undefined>;
    findOneByUserId(userId: string): Promise<UserDto | undefined>;
    signUp(dto: SignUpDto): Promise<{
        message: string;
    }>;
    getProfile(user: any): Promise<GetUserProfileOutput>;
    updateProfile(user: any, dto: UpdateUserDto): Promise<GetUserProfileOutput>;
    upgradeSubscription(user: any, dto: UpgradeSubscriptionPlanDto): Promise<{
        message: string;
    }>;
    getUserDashboard(user: any): Promise<GetDashboardOutput>;
}
