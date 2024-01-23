import { Injectable } from '@nestjs/common';
import { UrlService } from '../url/url.service';

@Injectable()
export class RedirectionService {
    constructor(
        private urlService: UrlService,
    ){}

    async redirect(id: string){
        return await this.urlService.redirect(id);
    }
}
