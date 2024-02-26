import { 
    CreateShortUrlDto,
    TEST_CLICK_COUNT, 
    TEST_ID, 
    TEST_LONG_URL, 
    TEST_SHORT_URL, 
    TEST_USER_ID, 
    Url 
} from "../../src/common";

const date = new Date();
export const URL_FIXTURE: Partial<Url[]> = [
    {
      id: TEST_ID,
      longUrl: TEST_LONG_URL,
      shortUrl: TEST_SHORT_URL,
      clickCount: TEST_CLICK_COUNT,
      createdAt: date,
      createdBy: TEST_USER_ID
    },
    {
        id: "1",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "2",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "3",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "4",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "5",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "6",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "8",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "9",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "10",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "11",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "12",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "13",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "14",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "15",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "16",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "17",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "18",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "19",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    },
    {
        id: "20",
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: TEST_USER_ID
    }
];

export const createShortUrlDto: CreateShortUrlDto = {
    longUrl: TEST_LONG_URL
};

export const E2E_URL_REDIRECTION_PARAM = '5c75d4ea';
export const E2E_URL_CUSTOM_REDIRECTION_PARAM = 'newdomain-cf5b2b31';
export const E2E_URL_ID = '98fa4581-1d29-4d4e-a4bf-9c59e872d527';
