import { randomBytes } from "crypto";


export const urlshortener = (longurl: string, id: string): any => {
    const randomString = generateRandomString(8); //generates a random string
    const shorturl = `localhost:3001/urlshortener/${randomString}`;
        
    return {
            shortUrl: shorturl,
            message: `Url successfully shortened !! Get it at: localhost:3001/urlshortener/${id}`
        }
}

function generateRandomString(length: number): string {
    const randomByte = randomBytes(Math.ceil(length / 2)).toString('hex');
    return randomByte.slice(0, length);
}
