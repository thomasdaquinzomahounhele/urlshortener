import { randomBytes } from "crypto";


export const urlshortener = (longurl: string, id: string): any => {
    const randomString = generateRandomString(8); //generate a random string
    const shorturl = `localhost:3001/urlshortener/${randomString}`;
        
    return {
            shortUrl: shorturl,
            message: `Url successfully shortened !! Go to localhost:3001/urlshortener/${id} to get the short url`
        }
}

function generateRandomString(length: number): string {
    const randomByte = randomBytes(Math.ceil(length / 2)).toString('hex');
    return randomByte.slice(0, length);
}
