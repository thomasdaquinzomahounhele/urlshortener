import { UrlDto } from "../dto";
export declare class GetDashboardOutput {
    UserUrls: Partial<UrlDto>[];
    message: {
        message: string;
        seeOurPlans: string;
    };
}
