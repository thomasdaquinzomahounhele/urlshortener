import { Injectable } from '@nestjs/common';
import { UrlService } from '../url/url.service';

@Injectable()
export class RedirectionService {
    constructor(
        private urlService: UrlService,
    ){}

    async redirect(id: string){
        const { longUrl } = await this.urlService.incrementClickCount(id);
        return { longUrl };
    }
}
