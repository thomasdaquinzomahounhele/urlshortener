export const SubscriptionPlanOutput = () => ({
    plans: {
        Free: {
            price: "0$/month",
            options: {
                numberOfShortLinks: "up to 50 per month", 
            }
        },
        Intermediate: {
            price: "9$/month",
            options: {
                numberOfShortLinks: "up to 200 per month", 
                linkTracking: "know how many clicks each link has"
            }
        },
        Premium: {
            price: "29$/month",
            options: {
                numberOfShortLinks: "up to 1000 per month", 
                linkTracking: "know how many clicks each link has",
                customDomain: "add a domain of your choice + linkTracking for each link with custom domain"
            }
        },
        ugradePlan: "click here to change subscription plan: localhost:3001/user/upgrade"
    }
});
