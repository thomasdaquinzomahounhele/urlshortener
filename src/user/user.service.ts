import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/schema';
import * as bcrypt from 'bcrypt';
import { mapUserToUserDto } from './mapping';
import { SignUpDto, UserDto } from '../common';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>
    ){}

    async findOne(email: string): Promise<UserDto | undefined>{
        const user = await this.userModel.findOne({ email })
        return mapUserToUserDto(user);
    }

    async signUp(dto: SignUpDto)/*: Promise<{ message: string }>*/{
        const { firstname, lastname, email, password } = dto;
        // const existingUser = this.findOne(email);
        //We have to write a code for when a user email is already in the db
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const User = new this.userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            hashedpassword: hashedpassword,
        });
        User.save();
        return { 
            message: 'You have successfully signed up . Go sign in at localhost:3001/auth/signin'
        };
    }
}
