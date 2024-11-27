import { UrlService } from './url.service';
import { CreateShortUrlDto } from '../common';
import { Request } from 'express';
export declare class UrlController {
    private urlService;
    constructor(urlService: UrlService);
    createShortenedUrl(dto: CreateShortUrlDto, req: Request): Promise<{
        message: string;
    }>;
    getShortenedUrl(id: string): Promise<{
        shortUrl: string;
    }>;
}
