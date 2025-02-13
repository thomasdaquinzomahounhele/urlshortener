import { AuthService } from './auth.service';
import { SignInDto } from '../common/dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private readonly logger;
    signIn(dto: SignInDto): Promise<{
        access_token: string;
    } | {
        success: boolean;
        message: string;
    }>;
}
