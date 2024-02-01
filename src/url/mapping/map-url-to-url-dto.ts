import { Subscription, Url, UrlDto } from "../../common";

export const mapUrlToUrlDto = (subscription: Subscription,url: Url): UrlDto => {
        if(subscription == Subscription.Free){
            return {
                longUrl: url.longUrl,
                shortUrl: url.shortUrl,
                createdAt: url.createdAt
            }
        } else {
            return {
                longUrl: url.longUrl,
                shortUrl: url.shortUrl,
                clickCount: url.clickCount,
                createdAt: url.createdAt
            }
        }
}
