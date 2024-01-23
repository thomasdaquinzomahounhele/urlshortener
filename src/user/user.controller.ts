import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../common/dto';
import { UserService } from './user.service';
import { Public } from '../common';

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
}
