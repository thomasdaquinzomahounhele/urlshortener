import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async signIn(email: string, password: string){
        const user  = await this.userService.findOne(email);
        const { hashedpassword, id, ...result } = user;
        const comparison = await bcrypt.compare(password, hashedpassword );

        if(!comparison){
            return { success: false, message: "Credentials incorrect" };
        }
        const payload = { sub: id, ...result };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    
}
