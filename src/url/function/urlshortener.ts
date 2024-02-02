import { randomBytes } from "crypto";
import { CreateShortUrlDto, Subscription } from "../../common";


export const urlshortener = (subscription: Subscription, dto: CreateShortUrlDto, id: string): { shortUrl: string, message: string } => {
    const randomString = generateRandomString(8); //generates a random string
    let shorturl: string;

    if( subscription == Subscription.Premium ){
        shorturl = `localhost:3001/${dto.customDomain}-${randomString}`;
    }else {
        shorturl = `localhost:3001/urlshortener/${randomString}`;
    }
    
    return {
            shortUrl: shorturl,
            message: `Url successfully shortened !! Get it at: localhost:3001/url/${id}`
        }
}

function generateRandomString(length: number): string {
    const randomByte = randomBytes(Math.ceil(length / 2)).toString('hex');
    return randomByte.slice(0, length);
}
