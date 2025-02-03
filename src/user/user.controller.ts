import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { SignUpDto, UpdateUserDto, UpgradeSubscriptionPlanDto } from '../common/dto';
import { UserService } from './user.service';
import { GetDashboardOutput, GetUserProfileOutput, Public } from '../common';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    private readonly logger = new Logger(UserController.name);

    @Public()
    @Post('signup')
    signUp(@Body() dto: SignUpDto): Promise<{ message: string }>{
        this.logger.log({ message: "Signing up", dto });
        return this.userService.signUp(dto);
    }

    @Get('profile')
    getProfile(@Req() req: Request ): Promise<GetUserProfileOutput>{
        this.logger.log({ message: "Profile" });
        const { user } = req.headers;
        return this.userService.getProfile(user);
    }

    @Post('update')
    updateProfile(@Body() dto: UpdateUserDto, @Req() req: Request): Promise<GetUserProfileOutput>{
        this.logger.log({ message: "Update", dto });
        const { user } = req.headers;
        return this.userService.updateProfile(user, dto);
    }


    @Post('upgrade')
    upgradeSubscription(@Body() dto: UpgradeSubscriptionPlanDto, @Req() req: Request): Promise<{ message: string }>{
        this.logger.log({ message: "Upgrade", dto });
        const { user } = req.headers;
        return this.userService.upgradeSubscription(user, dto);
    }

    @Get('dashboard')
    getUserDashboard(@Req() req: Request): Promise<GetDashboardOutput>{
        this.logger.log({ message: "Dashboard" });
        const { user } = req.headers;
        return this.userService.getUserDashboard(user);
    }
}
