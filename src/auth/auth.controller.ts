import { 
    Body, 
    Controller, 
    HttpCode, 
    HttpStatus, 
    Logger, 
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
    private readonly logger = new Logger(AuthController.name);
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() dto: SignInDto): Promise<{ access_token: string } | { success: boolean, message: string }>{
        this.logger.log({ message: "Signing in", dto });
        return this.authService.signIn(dto.email, dto.password);
    }
}
