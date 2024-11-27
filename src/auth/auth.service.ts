import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async signIn(email: string, password: string): Promise<{ access_token: string } | { success: boolean, message: string }>{
        const user  = await this.userService.findOneByEmail(email);
        if(user){
            const { hashedpassword, userId, ...result } = user;
            const comparison = await bcrypt.compare(password, hashedpassword );
            if(!comparison){
                return { success: false, message: "Credentials incorrect" };
            }
            const payload = { sub: userId, ...result };
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        }else {
            return { success: false, message: "Credentials incorrect" };
        }
       
    } 
}
