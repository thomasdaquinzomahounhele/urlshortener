import { Injectable } from '@nestjs/common';
import { UrlService } from '../url/url.service';

@Injectable()
export class CustomDomainRedirectionService {
    constructor(
        private urlService: UrlService,
    ){}

    async redirect(param: string): Promise<{ longUrl: string; }>{
        const { longUrl } = await this.urlService.incrementClickCount(param);
        return { longUrl };
    }
}
