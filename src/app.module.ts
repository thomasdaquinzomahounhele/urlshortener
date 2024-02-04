import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RedirectionModule } from './redirection/redirection.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CustomDomainRedirectionModule } from './custom-domain-redirection/custom-domain-redirection.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    UrlModule,
    MongooseModule.forRoot("mongodb://localhost:27017/urlshortener"),
    UserModule,
    AuthModule,
    RedirectionModule,
    SubscriptionModule,
    CustomDomainRedirectionModule,
    CronjobModule
  ],
})
export class AppModule {}
