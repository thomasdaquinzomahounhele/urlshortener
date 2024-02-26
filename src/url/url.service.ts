import { Inject, Injectable, NotAcceptableException, forwardRef } from '@nestjs/common';
import { CreateShortUrlDto } from '../common/dto';
import { FUNCTION, Urlshortener } from './function';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UserUrl } from '../common/schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { Subscription, TotalLinks } from '../common';
import { UserService } from '../user/user.service';

@Injectable()
export class UrlService {
    constructor(
        @Inject(FUNCTION)
        private urlShortener: Urlshortener,
        @InjectModel(Url.name)
        private urlModel: Model<Url>,
        @InjectModel(UserUrl.name)
        private userUrlModel: Model<UserUrl>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ){}

    async findOneUrl(id: string): Promise<Url>{
        const url: Url = await this.urlModel.findOne({ id: id });
        return url;
    }

    async findUserUrls(userId: string): Promise<UserUrl | undefined> {
        const userUrls = await this.userUrlModel.findOne({ userId });
        return userUrls;
    }

    async isAllowed(userId: string, subscription: Subscription): Promise<boolean>{
        const userUrls  = await this.findUserUrls(userId);
        
        if(!userUrls){
            return true; // case new user shortening url
        };
        if(subscription == Subscription.Free){
            if(userUrls.urls.length >= TotalLinks.Free){
                return false;
            }else{
                return true;
            }
        }else if(subscription == Subscription.Intermediate){
            if(userUrls.urls.length >= TotalLinks.Intermediate){
                return false;
            }else{
                return true;
            }
        }else if(subscription == Subscription.Premium){
            if(userUrls.urls.length >= TotalLinks.Premium){
                return false;
            }else{
                return true;
            }
        }
    }

    async createShortenedUrl(dto: CreateShortUrlDto, user: any): Promise<{ message: string }>{
        const { sub } = user;
        const { subscription } = await this.userService.findOneByUserId(sub);
        const isAllowed: boolean = await this.isAllowed(sub, subscription);

        if(isAllowed === false){
            return {
                message: "You have reached the limit of short links you can create this month !! Upgrade your subscription plan for more. See our offers here: localhost:3001/subscription"
            }
        }

        if (validator.isURL(dto.longUrl)) {
            const id = uuidv4(); // Generate a UUID
            const { shortUrl, message } = this.urlShortener(subscription, dto, id);
            await this.urlModel.insertMany({
                id: id,
                longUrl: dto.longUrl,
                shortUrl: shortUrl,
                clickCount: 0,
                createdAt: new Date(),
                createdBy: sub
            });
            const Url = await this.findOneUrl(id);
            await this.updateUserUrlsWithNewUrl(sub, Url);
            return { message };         
        } else {
            throw new NotAcceptableException(
                "Please enter a valid url",
                { description: "Verify if you copied the whole link. If you did !! Verify if your url actually works and directs to a website"},
            );
        } 
    }

    async getShortenedUrl(id: string): Promise<{ shortUrl: string; }>{
        const url = await this.urlModel.findOne({id: id});
        return { shortUrl: url.shortUrl };
    }

    async incrementClickCount(param: string): Promise<Url>{
        const normalShortUrl = `localhost:3001/urlshortener/${param}`;
        const customShortUrl = `localhost:3001/${param}`;
        const normalUrl: Url = await this.urlModel.findOne({ shortUrl: normalShortUrl });
        const customUrl: Url = await this.urlModel.findOne({ shortUrl: customShortUrl });
        let createdBy: string;
        let clickCount: number; 
        let updatedUrl: Url;

        if(normalUrl){
             ({ clickCount, createdBy } = normalUrl);
            updatedUrl = await this.urlModel.findOneAndUpdate(
                { shortUrl: normalShortUrl }, 
                { clickCount: clickCount+1 },
                { new: true }
            );
        } 
        if(customUrl){
             ({ clickCount, createdBy } = customUrl);
            updatedUrl = await this.urlModel.findOneAndUpdate(
                { shortUrl: customShortUrl}, 
                { clickCount: clickCount+1 },
                { new: true }
            );
        }

        await this.updateUserUrlsClickCount(createdBy, updatedUrl);
        return updatedUrl;
    }

    async updateUserUrlsWithNewUrl(userId: string, url: Url): Promise<UserUrl>{
        const existingUser = await this.findUserUrls(userId);
        if(existingUser){
            let updatedUrls = [...existingUser.urls];
            updatedUrls.push(url);
            return await this.userUrlModel.findOneAndUpdate(
                { userId: userId },
                { $set: {
                    urls: updatedUrls
                    }
                },
                { new: true }
            )
        } else {
            await this.userUrlModel.insertMany({
                userId: userId,
                urls: [url],
            });
            const userUrls = await this.userUrlModel.findOne({ userId: userId });
            return userUrls;
        }
    }

    async updateUserUrls(userId: string, urls: Url[]): Promise<UserUrl>{
            return await this.userUrlModel.findOneAndUpdate(
                { userId: userId },
                { $set: {
                    urls: urls
                    }
                },
                { new: true }
            )
    }

    async updateUserUrlsClickCount(userId: string, url: Url): Promise<UserUrl>{
        const userUrls = await this.findUserUrls(userId);
        const index = userUrls.urls.findIndex((element) => ( element.id == url.id));
        userUrls.urls[index] = url;
        return await this.userUrlModel.findOneAndUpdate(
            { userId: userId },
            { $set: {
                urls: userUrls.urls
                }
            },
            { new: true }
        )
    }

    async cleanUp(args: any): Promise<void>{
        await this.urlModel.deleteMany(args)
    }

    async findAllUserUrls(){
        const userUrls = await this.userUrlModel.find({});
        return userUrls;
    }
}
