import { RedirectionService } from './redirection.service';
export declare class RedirectionController {
    private redirectionService;
    constructor(redirectionService: RedirectionService);
    redirect(param: string): Promise<{
        longUrl: string;
    }>;
}
