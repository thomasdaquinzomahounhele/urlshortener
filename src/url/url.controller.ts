import { Body, Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortUrlDto } from '../common';
import { Request } from 'express';

@Controller('url')
export class UrlController {
    constructor(
        private urlService: UrlService
    ){}
    private readonly logger = new Logger(UrlController.name);
    
    @Post('shortenUrl')
    createShortenedUrl(@Body() dto: CreateShortUrlDto, @Req() req: Request): Promise<{ message: string }>{
        this.logger.log({ message: 'Creating a short Url', dto });
        const { user } = req.headers;
        return this.urlService.createShortenedUrl(dto, user);
    }

    @Get(':id')
    getShortenedUrl(@Param('id') id: string): Promise<{ shortUrl: string; }>{
        this.logger.log({ message: 'Getting a short Url with id', id });
        return this.urlService.getShortenedUrl(id);
    }
}
