import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SignUpDto, UpdateUserDto } from '../common/dto';
import { UserService } from './user.service';
import { GetUserProfileOutput, Public } from '../common';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    
    @Public()
    @Post('signup')
    signUp(@Body() dto: SignUpDto){
        return this.userService.signUp(dto);
    }

    @Get('profile')
    getProfile(@Req() req: Request ): GetUserProfileOutput{
            return this.userService.getProfile(req);
    }

    @Post('update')
    async updateProfile(@Body() dto: UpdateUserDto, @Req() req: Request): Promise<GetUserProfileOutput>{
        const { user } = req.headers;
        return this.userService.updateProfile(user, dto);
    }
}
