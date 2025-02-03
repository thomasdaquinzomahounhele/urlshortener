import { Controller, Get, Logger, Param } from '@nestjs/common';
import { RedirectionService } from './redirection.service';
import { Public } from '../common';

@Controller('urlshortener')
export class RedirectionController {
    constructor(
        private redirectionService: RedirectionService,
    ){}
    private readonly logger = new Logger(RedirectionController.name);
    
    @Public()
    @Get(':param')
    redirect(@Param('param')param: string): Promise<{ longUrl: string; }>{
        this.logger.log({ message: "URL Redirection"});
        return this.redirectionService.redirect(param);
    }
}
