import { UrlService } from '../url/url.service';
export declare class CustomDomainRedirectionService {
    private urlService;
    constructor(urlService: UrlService);
    redirect(param: string): Promise<{
        longUrl: string;
    }>;
}
