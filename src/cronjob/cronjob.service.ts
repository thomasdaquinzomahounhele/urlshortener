import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UrlService } from 'src/url/url.service';

@Injectable()
export class CronjobService {
    constructor(
        private urlService: UrlService
    ){}
    private readonly logger = new Logger(CronjobService.name);


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'Clean up'})
  async cleanUp() {
    this.logger.debug('Midnight clean up');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
    this.urlService.cleanUp({
        createdAt: { $lt: thirtyDaysAgo }, clickCount: { $lt: 10 },
    });

    const userUrls = await this.urlService.findAllUserUrls();
    for (const userUrl of userUrls) {
        userUrl.urls = userUrl.urls.filter(url => !(url.createdAt < thirtyDaysAgo && url.clickCount < 10));
        await userUrl.save();
    }
  }
}
