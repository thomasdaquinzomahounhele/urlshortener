export declare const SubscriptionPlanOutput: () => {
    plans: {
        Free: {
            price: string;
            options: {
                numberOfShortLinks: string;
            };
        };
        Intermediate: {
            price: string;
            options: {
                numberOfShortLinks: string;
                linkTracking: string;
            };
        };
        Premium: {
            price: string;
            options: {
                numberOfShortLinks: string;
                linkTracking: string;
                customDomain: string;
            };
        };
        ugradePlan: string;
    };
};
