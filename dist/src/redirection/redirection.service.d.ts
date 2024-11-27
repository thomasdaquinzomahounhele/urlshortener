import { UrlService } from '../url/url.service';
export declare class RedirectionService {
    private urlService;
    constructor(urlService: UrlService);
    redirect(param: string): Promise<{
        longUrl: string;
    }>;
}
