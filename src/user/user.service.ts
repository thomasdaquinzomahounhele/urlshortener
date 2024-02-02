import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/schema';
import * as bcrypt from 'bcrypt';
import { mapUserToGetUserProfileOutput, mapUserToUserDto } from './mapping';
import { 
    GetDashboardOutput,
    GetUserProfileOutput, 
    SignUpDto, 
    Subscription, 
    UpdateUserDto, 
    UpgradeSubscriptionPlanDto, 
    UserDto 
} from '../common';
import { v4 as uuidv4 } from 'uuid';
import { UrlService } from '../url/url.service';
import { mapUserUrlToDashboardOutput } from './mapping/map-user-url-to-dashboard-output';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        @Inject(forwardRef(() => UrlService))
        private urlService: UrlService,
    ){}

    async findOneByEmail(email: string): Promise<UserDto | undefined>{
        const user = await this.userModel.findOne({ email })
        const result = user ? mapUserToUserDto(user) : undefined;
        return result;
    };

    async findOneByUserId(userId: string): Promise<UserDto | undefined>{
        const user = await this.userModel.findOne({ userId })
        const result = user ? mapUserToUserDto(user) : undefined;
        return result;
    };

    async signUp(dto: SignUpDto): Promise<{ message: string }>{
        const { firstname, lastname, email, password } = dto;
        const existingUser = await this.findOneByEmail(email);
        if(existingUser){
            return { message: "Email address already in use. Please choose a different email"}
        }

        const userId = uuidv4(); // Generate a UUID
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const User = new this.userModel({
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            hashedpassword: hashedpassword,
            subscription: Subscription.Free
        });
        User.save();
        return { 
            message: 'You have successfully signed up. You can shorten your links right after signing in at localhost:3001/auth/signin'
        };
    };

    async getProfile(user: any ): Promise<GetUserProfileOutput>{
        const { sub } = user;
        const realUser = await this.findOneByUserId(sub);
        return mapUserToGetUserProfileOutput(realUser);
    }

    async updateProfile(user: any, dto: UpdateUserDto): Promise<GetUserProfileOutput>{
        const { sub } = user;
        
        let  updatedUser = await this.userModel.findOneAndUpdate(
            { userId: sub }, 
            { $set: dto }, 
            { new: true }
        );
        if(dto.password){
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.password, salt);
            const updateUserDto = {
                hashedpassword: hash,
            };
            updatedUser = await this.userModel.findOneAndUpdate(
                { userId: sub }, 
                { $set: updateUserDto }, 
                { new: true }
            );
        }
        return mapUserToGetUserProfileOutput(mapUserToUserDto(updatedUser));
    };

    async upgradeSubscription(user: any, dto: UpgradeSubscriptionPlanDto): Promise<{ message: string; }>{
        const { sub } = user;
        await this.userModel.findOneAndUpdate(
            { userId: sub },
            { 
                $set: {
                    subscription: dto.newPlan,
                },
            },
            { new: true },
        );
        return {
            message: `Now you can benefit from all the advantages of the #${dto.newPlan} plan`,
        }
    };

    async getUserDashboard(user: any): Promise<GetDashboardOutput>{
        const { sub } = user;
        const userUrls = await this.urlService.findUserUrls(sub);
        const { subscription } = await this.findOneByUserId(sub);
        return mapUserUrlToDashboardOutput(subscription, userUrls.urls);
    }    
}
