import { mapUrlToUrlDto } from "../../url/mapping";
import { GetDashboardOutput, Subscription, Url } from "../../common";

export const mapUserUrlToDashboardOutput = (subscription: Subscription, urls: Url[]): GetDashboardOutput => {
        const UserUrls = urls.map((url: Url) => {
            return mapUrlToUrlDto(subscription, url);
        });
        
        return {
            UserUrls: UserUrls,
            message: {
                message:'Want more control over your short links ? Upgrade your subscription plan',
                seeOurPlans: "click here to see what we have for you: localhost:3001/subscription"
            }
        }
}
