import { IsString } from "@nestjs/class-validator";

export class CreateShortUrlDto {
    @IsString()	
    longUrl: string 
}
