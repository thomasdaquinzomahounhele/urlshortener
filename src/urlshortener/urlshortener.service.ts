import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateShortUrlDto } from './dto';
import { FUNCTION } from './function';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

@Injectable()
export class UrlshortenerService {
    constructor(
        @Inject(FUNCTION)
        private urlShortener: (longurl: string, id: string) => {
            longUrl: string,
            shortUrl: string, 
            message: string
        },
        @InjectModel(Url.name)
        private urlModel: Model<Url>
    ){}

    createShortenedUrl(dto: CreateShortUrlDto){
        if (validator.isURL(dto.longUrl)) {
            const id = uuidv4(); // Generate a UUID
            const { shortUrl, message } = this.urlShortener(dto.longUrl, id);
            const Url = new this.urlModel({
                id: id,
                longUrl: dto.longUrl,
                shortUrl: shortUrl
            });
            Url.save();
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
        if(!url){
            const shortUrl = `localhost:3001/urlshortener/${id}`;
            const url = await this.urlModel.findOne({shortUrl: shortUrl});
            return { longUrl: url.longUrl };
        }
        return { shortUrl: url.shortUrl };
    }
}
