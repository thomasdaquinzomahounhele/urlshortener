import { UrlService } from '../url/url.service';
export declare class CronjobService {
    private urlService;
    constructor(urlService: UrlService);
    private readonly logger;
    handleCleanUpCron(): Promise<void>;
}
