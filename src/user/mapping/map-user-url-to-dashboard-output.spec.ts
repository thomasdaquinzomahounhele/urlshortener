import { Subscription, TEST_ID, TEST_LONG_URL, TEST_SHORT_URL, TEST_USER_ID, Url } from "../../common";
import { mapUserUrlToDashboardOutput } from "./map-user-url-to-dashboard-output";

describe('mapUserUrlToDashboardOutput', () => {
    const date = new Date();
    const url: Partial<Url[]> = [{
        id: TEST_ID,
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: 3,
        createdAt: date,
        createdBy: TEST_USER_ID
    }];
    test('returns Dashboard output', async() => {
        const userUrlToDashboardOutput = mapUserUrlToDashboardOutput(Subscription.Free, url);
        expect(userUrlToDashboardOutput).toEqual({
            UserUrls: [
              {
                longUrl: "https://docs.nestjs.com/techniques",
                shortUrl: 'localhost:3001/urlshortener/test_shorturl',
                createdAt: date
              }
            ],
            message: {
              message: 'Want more control over your short links ? Upgrade your subscription plan',
              seeOurPlans: 'click here to see what we have for you: localhost:3001/subscription'
            }
          });
    });
});
