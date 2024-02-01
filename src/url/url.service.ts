import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateShortUrlDto } from '../common/dto';
import { FUNCTION, Urlshortener } from './function';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UserUrl } from '../common/schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

@Injectable()
export class UrlService {
    constructor(
        @Inject(FUNCTION)
        private urlShortener: Urlshortener,
        @InjectModel(Url.name)
        private urlModel: Model<Url>,
        @InjectModel(UserUrl.name)
        private userUrlModel: Model<UserUrl>
    ){}

    async findUserUrls(userId: string): Promise<UserUrl | undefined> {
        const userUrls = await this.userUrlModel.findOne({ userId });
        return userUrls;
    }

    async createShortenedUrl(dto: CreateShortUrlDto, user: any){
        if (validator.isURL(dto.longUrl)) {
            const id = uuidv4(); // Generate a UUID
            const { shortUrl, message } = this.urlShortener(dto.longUrl, id);
            const { sub } = user;
            console.log('this is the user coming from the request object in the createShortenedUrl method of the urlService', user);
            const Url = new this.urlModel({
                id: id,
                longUrl: dto.longUrl,
                shortUrl: shortUrl,
                clickCount: 0,
                createdAt: new Date(),
                createdBy: sub
            });
            Url.save();
            await this.updateUserUrls(sub, Url);
            return { message };         
        } else {
            throw new NotAcceptableException(
                "Please enter a valid url",
                { description: "Verify if you copied the whole link. If you did !! Verify if your url actually works and directs to a website"},
            );
        }
        
    }

    async getShortenedUrl(id: string){
        const url = await this.urlModel.findOne({id: id});
        return { shortUrl: url.shortUrl };
    }

    async incrementClickCount(id: string){
        const shortUrl = `localhost:3001/urlshortener/${id}`;
        const { clickCount, createdBy } = await this.urlModel.findOne({ shortUrl });
        const updatedUrl = await this.urlModel.findOneAndUpdate({ shortUrl }, { clickCount: clickCount+1 });
        await this.updateUserUrls(createdBy, updatedUrl);
        return updatedUrl;
    }

    async updateUserUrls(userId: string, url: Url){
        
        console.log('this is the userId in the updateUserUrls method of the urlService', userId);
        const existingUser = await this.findUserUrls(userId);
        console.log('this is the existingUser in the updateUserUrls method of the urlService', existingUser);
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
            const userUrls = new this.userUrlModel({
                userId: userId,
                urls: [url],
            })
            return userUrls.save();
        }
    }
}
