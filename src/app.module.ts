import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlshortenerModule } from './urlshortener/urlshortener.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UrlshortenerModule,
    MongooseModule.forRoot("mongodb://localhost:27017/urlshortener")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
