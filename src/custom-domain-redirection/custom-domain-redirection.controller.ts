import { Controller, Get, Param } from '@nestjs/common';
import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
import { Public } from '../common';

@Controller()
export class CustomDomainRedirectionController {
    constructor(
        private customDomainRedirectionService: CustomDomainRedirectionService
    ){}

    @Public()
    @Get(':param')
    redirect(@Param('param')param: string): Promise<{ longUrl: string; }>{
        return this.customDomainRedirectionService.redirect(param);
    }
}
