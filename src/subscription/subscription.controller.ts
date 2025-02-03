import { Controller, Get, Logger } from '@nestjs/common';
import { Public, SubscriptionPlanOutput } from '../common';

@Controller('subscription')
export class SubscriptionController {
    private readonly logger = new Logger(SubscriptionController.name);
    
    @Public()
    @Get()
    getSubscriptionPlans(){
        this.logger.log({ message: "Subscription Plans"});
        return SubscriptionPlanOutput();
    }
}
