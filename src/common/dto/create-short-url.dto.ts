import { IsOptional, IsString } from "@nestjs/class-validator";

export class CreateShortUrlDto {
    @IsString()	
    longUrl: string;

    @IsOptional()
    @IsString()	
    customDomain?: string;
}
