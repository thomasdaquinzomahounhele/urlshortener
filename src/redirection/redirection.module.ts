import { Module } from '@nestjs/common';
import { RedirectionController } from './redirection.controller';
import { RedirectionService } from './redirection.service';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [
    UrlModule,
  ],
  controllers: [RedirectionController],
  providers: [RedirectionService]
})
export class RedirectionModule {}
