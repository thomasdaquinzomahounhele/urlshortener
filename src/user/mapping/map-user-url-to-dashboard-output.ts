import { mapUrlToUrlDto } from "src/url/mapping";
import { GetDashboardOutput, Subscription, Url } from "../../common";

export const mapUserUrlToDashboardOutput = (subscription: Subscription, urls: Url[]): GetDashboardOutput => {
        urls.map((url: Url) => {
            mapUrlToUrlDto(subscription, url)
        })
        
        return {
            UserUrls: urls,
            message: {
                message:'Want more control over your short links ? Upgrade your subscription plan',
                seeOurPlans: "click here to see what we have for you: "
            }
        }
}
