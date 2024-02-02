import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RedirectionModule } from './redirection/redirection.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UrlModule,
    MongooseModule.forRoot("mongodb://localhost:27017/urlshortener"),
    UserModule,
    AuthModule,
    RedirectionModule,
    SubscriptionModule
  ],
})
export class AppModule {}
