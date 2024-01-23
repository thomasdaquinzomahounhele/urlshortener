import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { FUNCTION, urlshortener } from './function';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from '../common/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema
      },
    ]),
  ],
  controllers: [UrlController],
  providers: [
    UrlService,
    {
      provide: FUNCTION,
      useValue: urlshortener
    }
  ],
  exports: [
    UrlService,
  ]
})
export class UrlModule {}
