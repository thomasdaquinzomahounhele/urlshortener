import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
import { Public } from '../common';

@Controller()
export class CustomDomainRedirectionController {
    constructor(
        private customDomainRedirectionService: CustomDomainRedirectionService
    ){}
    private readonly logger = new Logger(CustomDomainRedirectionController.name);

    @Public()
    @Get(':param')
    redirect(@Param('param')param: string): Promise<{ longUrl: string; }>{
        this.logger.log({ message: "URL redirection" });
        return this.customDomainRedirectionService.redirect(param);
    }
}
