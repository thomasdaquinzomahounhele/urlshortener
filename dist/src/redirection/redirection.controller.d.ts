import { RedirectionService } from './redirection.service';
export declare class RedirectionController {
    private redirectionService;
    constructor(redirectionService: RedirectionService);
    private readonly logger;
    redirect(param: string): Promise<{
        longUrl: string;
    }>;
}
