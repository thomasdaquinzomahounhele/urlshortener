import { Controller, Get, Param } from '@nestjs/common';
import { RedirectionService } from './redirection.service';
import { Public } from '../common';

@Controller('urlshortener')
export class RedirectionController {
    constructor(
        private redirectionService: RedirectionService,
    ){}
    
    @Public()
    @Get(':id')
    redirect(@Param('id')id: string){
        return this.redirectionService.redirect(id);
    }
}
