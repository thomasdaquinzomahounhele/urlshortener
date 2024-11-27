import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
    } | {
        success: boolean;
        message: string;
    }>;
}
