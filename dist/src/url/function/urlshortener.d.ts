import { CreateShortUrlDto, Subscription } from "../../common";
export declare const urlshortener: (subscription: Subscription, dto: CreateShortUrlDto, id: string) => {
    shortUrl: string;
    message: string;
};
