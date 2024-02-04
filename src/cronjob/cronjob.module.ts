import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { UrlModule } from 'src/url/url.module';

@Module({
  imports: [UrlModule],
  providers: [CronjobService]
})
export class CronjobModule {}
