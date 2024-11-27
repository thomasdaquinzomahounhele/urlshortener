import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
export declare class CustomDomainRedirectionController {
    private customDomainRedirectionService;
    constructor(customDomainRedirectionService: CustomDomainRedirectionService);
    redirect(param: string): Promise<{
        longUrl: string;
    }>;
}
