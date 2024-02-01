import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/schema';
import * as bcrypt from 'bcrypt';
import { mapUserToGetUserProfileOutput, mapUserToUserDto } from './mapping';
import { 
    GetUserProfileOutput, 
    SignUpDto, 
    Subscription, 
    UpdateUserDto, 
    UserDto 
} from '../common';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>
    ){}

    async findOne(email: string): Promise<UserDto | undefined>{
        const user = await this.userModel.findOne({ email })
        const result = user ? mapUserToUserDto(user) : undefined;
        return result;
    }

    async signUp(dto: SignUpDto)/*: Promise<{ message: string }>*/{
        const { firstname, lastname, email, password } = dto;
        const existingUser = await this.findOne(email);
        if(existingUser){
            return { message: "Email address already in use. Please choose a different email"}
        }

        const userId = uuidv4(); // Generate a UUID
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const User = new this.userModel({
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            hashedpassword: hashedpassword,
            subscription: Subscription.Free
        });
        User.save();
        return { 
            message: 'You have successfully signed up . Go sign in at localhost:3001/auth/signin'
        };
    }

    getProfile(req: Request ): GetUserProfileOutput{
        const { user } = req.headers;
        return mapUserToGetUserProfileOutput(user);
    }

    async updateProfile(user: any, dto: UpdateUserDto): Promise<GetUserProfileOutput>{
        const { sub } = user;
        
        let  updatedUser = await this.userModel.findOneAndUpdate(
            { userId: sub }, 
            { $set: dto }, 
            { new: true }
        );
        if(dto.password){
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.password, salt);
            const updateUserDto = {
                hashedpassword: hash,
            };
            updatedUser = await this.userModel.findOneAndUpdate(
                { userId: sub }, 
                { $set: updateUserDto }, 
                { new: true }
            );
        }
        return mapUserToGetUserProfileOutput(mapUserToUserDto(updatedUser));
    }
}
