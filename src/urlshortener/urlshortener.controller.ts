import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlshortenerService } from './urlshortener.service';
import { CreateShortUrlDto } from './dto';

@Controller('urlshortener')
export class UrlshortenerController {
    constructor(
        private urlshortenerService: UrlshortenerService
    ){}

    @Post('shortenUrl')
    createShortenedUrl(@Body() dto: CreateShortUrlDto){
        return this.urlshortenerService.createShortenedUrl(dto);
    }

    @Get(':id')
    getShortenedUrl(@Param('id') id: string){
        return this.urlshortenerService.getShortenedUrl(id);
    }
}
