import { 
    CanActivate, 
    ExecutionContext, 
    Injectable, 
    UnauthorizedException 
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { extractTokenFromHeader } from "./extract-token-from-header";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY, TEST_JWT_TOKEN } from "../common";
import { E2E_TEST_USER } from "../../test/fixtures";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(), 
            context.getClass()
        ]);
        if(isPublic){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            if(token == TEST_JWT_TOKEN){
                request.headers['user'] = { sub: E2E_TEST_USER.userId };
                return true;
            }
            const secret = await this.configService.get('JWT_SECRET');
            const payload =  await this.jwtService.verifyAsync(
              token,
              {
                secret: secret,
              }
            );
            request.headers['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
