import { Module } from '@nestjs/common';
import { UrlshortenerController } from './urlshortener.controller';
import { UrlshortenerService } from './urlshortener.service';
import { FUNCTION, urlshortener } from './function';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema
      },
    ]),
  ],
  controllers: [UrlshortenerController],
  providers: [
    UrlshortenerService,
    {
      provide: FUNCTION,
      useValue: urlshortener
    }
  ]
})
export class UrlshortenerModule {}
