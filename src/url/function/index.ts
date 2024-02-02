import { CreateShortUrlDto, Subscription } from "../../common";

export * from "./urlshortener";

export const FUNCTION = "function";
export type Urlshortener = (subscription: Subscription, dto: CreateShortUrlDto, id: string) => {
    shortUrl: string, 
    message: string
}
