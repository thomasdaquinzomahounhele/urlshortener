import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SignUpDto, UpdateUserDto, UpgradeSubscriptionPlanDto } from '../common/dto';
import { UserService } from './user.service';
import { GetDashboardOutput, GetUserProfileOutput, Public } from '../common';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    
    @Public()
    @Post('signup')
    signUp(@Body() dto: SignUpDto): Promise<{ message: string }>{
        return this.userService.signUp(dto);
    }

    @Get('profile')
    getProfile(@Req() req: Request ): Promise<GetUserProfileOutput>{
        const { user } = req.headers;
        return this.userService.getProfile(user);
    }

    @Post('update')
    updateProfile(@Body() dto: UpdateUserDto, @Req() req: Request): Promise<GetUserProfileOutput>{
        const { user } = req.headers;
        return this.userService.updateProfile(user, dto);
    }


    @Post('upgrade')
    upgradeSubscription(@Body() dto: UpgradeSubscriptionPlanDto, @Req() req: Request): Promise<{ message: string }>{
        const { user } = req.headers;
        return this.userService.upgradeSubscription(user, dto);
    }

    @Get('dashboard')
    getUserDashboard(@Req() req: Request): Promise<GetDashboardOutput>{
        const { user } = req.headers;
        return this.userService.getUserDashboard(user);
    }
}
