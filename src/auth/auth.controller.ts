import { 
    Body, 
    Controller, 
    HttpCode, 
    HttpStatus, 
    Post 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../common/dto';
import { Public } from '../common';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() dto: SignInDto): Promise<{ access_token: string } | { success: boolean, message: string }>{
        return this.authService.signIn(dto.email, dto.password);
    }
}
