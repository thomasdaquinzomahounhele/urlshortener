import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [UrlModule],
  providers: [CronjobService]
})
export class CronjobModule {}
