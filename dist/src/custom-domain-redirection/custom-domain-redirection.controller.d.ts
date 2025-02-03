import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
export declare class CustomDomainRedirectionController {
    private customDomainRedirectionService;
    constructor(customDomainRedirectionService: CustomDomainRedirectionService);
    private readonly logger;
    redirect(param: string): Promise<{
        longUrl: string;
    }>;
}
