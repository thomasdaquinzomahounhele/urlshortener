import { Module } from '@nestjs/common';
import { UrlshortenerModule } from './urlshortener/urlshortener.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UrlshortenerModule,
    MongooseModule.forRoot("mongodb://localhost:27017/urlshortener")
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
