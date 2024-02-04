import { Module } from '@nestjs/common';
import { CustomDomainRedirectionController } from './custom-domain-redirection.controller';
import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
import { UrlModule } from 'src/url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [CustomDomainRedirectionController],
  providers: [CustomDomainRedirectionService]
})
export class CustomDomainRedirectionModule {}
