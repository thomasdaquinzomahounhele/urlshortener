import { CreateShortUrlDto } from '../common/dto';
import { Urlshortener } from './function';
import { Url, UserUrl } from '../common/schema';
import { Model } from 'mongoose';
import { Subscription } from '../common';
import { UserService } from '../user/user.service';
export declare class UrlService {
    private urlShortener;
    private urlModel;
    private userUrlModel;
    private userService;
    constructor(urlShortener: Urlshortener, urlModel: Model<Url>, userUrlModel: Model<UserUrl>, userService: UserService);
    private readonly logger;
    findOneUrl(id: string): Promise<Url>;
    findUserUrls(userId: string): Promise<UserUrl | undefined>;
    isAllowed(userId: string, subscription: Subscription): Promise<boolean>;
    createShortenedUrl(dto: CreateShortUrlDto, user: any): Promise<{
        message: string;
    }>;
    getShortenedUrl(id: string): Promise<{
        shortUrl: string;
    }>;
    incrementClickCount(param: string): Promise<Url>;
    updateUserUrlsWithNewUrl(userId: string, url: Url): Promise<UserUrl>;
    updateUserUrls(userId: string, urls: Url[]): Promise<UserUrl>;
    updateUserUrlsClickCount(userId: string, url: Url): Promise<UserUrl>;
    cleanUp(args: any): Promise<void>;
    findAllUserUrls(): Promise<(import("mongoose").Document<unknown, {}, UserUrl> & UserUrl & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
