import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto  {
    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password: string;
}
