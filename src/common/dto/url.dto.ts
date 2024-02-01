import { Expose } from "class-transformer";

export class UrlDto {
    @Expose()
    id?: string;

    @Expose()
    longUrl: string;

    @Expose()
    shortUrl: string;

    @Expose()
    clickCount?: number;

    @Expose()
    createdAt: Date;

    @Expose()
    createdBy?: string;
}
