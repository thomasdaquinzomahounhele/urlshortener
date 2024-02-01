export * from "./urlshortener";

export const FUNCTION = "function";
export type Urlshortener = (longurl: string, id: string) => {
    longUrl: string,
    shortUrl: string, 
    message: string
}
