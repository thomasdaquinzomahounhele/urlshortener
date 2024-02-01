import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortUrlDto } from '../common';
import { Request } from 'express';

@Controller('url')
export class UrlController {
    constructor(
        private urlService: UrlService
    ){}
    
    @Post('shortenUrl')
    createShortenedUrl(@Body() dto: CreateShortUrlDto, @Req() req: Request){
        const { user } = req.headers;
        return this.urlService.createShortenedUrl(dto, user);
    }

    @Get(':id')
    getShortenedUrl(@Param('id') id: string){
        return this.urlService.getShortenedUrl(id);
    }
}
