import { CreateShortUrlDto, Subscription } from "../../common";
export * from "./urlshortener";
export declare const FUNCTION = "function";
export type Urlshortener = (subscription: Subscription, dto: CreateShortUrlDto, id: string) => {
    shortUrl: string;
    message: string;
};
