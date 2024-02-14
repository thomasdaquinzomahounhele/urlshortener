import { 
    Subscription, 
    TEST_CLICK_COUNT, 
    TEST_ID, 
    TEST_LONG_URL, 
    TEST_SHORT_URL, 
    TEST_USER_ID, 
    Url, 
    UrlDto 
} from "../../common";
import { mapUrlToUrlDto } from "./map-url-to-url-dto";

describe('mapUrlToUrlDto', () => {
    const date = new Date();
    const url: Url = {
        id: TEST_ID,
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    };
    test('maps to dto', async() => {
        const dto: UrlDto = mapUrlToUrlDto(Subscription.Free, url);
        expect(dto).toEqual(
            expect.objectContaining({
                longUrl: url.longUrl,
                shortUrl: url.shortUrl,
                createdAt: url.createdAt
            })
        );
    });
});
