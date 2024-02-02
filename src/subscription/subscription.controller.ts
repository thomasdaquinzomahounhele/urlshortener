import { Controller, Get } from '@nestjs/common';
import { Public, SubscriptionPlanOutput } from '../common';

@Controller('subscription')
export class SubscriptionController {

    @Public()
    @Get()
    getSubscriptionPlans(){
        return SubscriptionPlanOutput();
    }
}
