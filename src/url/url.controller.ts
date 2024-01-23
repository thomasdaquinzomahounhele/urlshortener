import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortUrlDto, Public } from '../common';

@Controller('url')
export class UrlController {
    constructor(
        private urlService: UrlService
    ){}
    
    @Post('shortenUrl')
    createShortenedUrl(@Body() dto: CreateShortUrlDto){
        return this.urlService.createShortenedUrl(dto);
    }

    @Get(':id')
    getShortenedUrl(@Param('id') id: string){
        return this.urlService.getShortenedUrl(id);
    }
}
