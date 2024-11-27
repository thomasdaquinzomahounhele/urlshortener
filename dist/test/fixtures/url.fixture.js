"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2E_URL_ID = exports.E2E_URL_CUSTOM_REDIRECTION_PARAM = exports.E2E_URL_REDIRECTION_PARAM = exports.createShortUrlDto = exports.URL_FIXTURE = void 0;
const common_1 = require("../../src/common");
const date = new Date();
exports.URL_FIXTURE = [
    {
        id: common_1.TEST_ID,
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "1",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "2",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "3",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "4",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "5",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "6",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "8",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "9",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "10",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "11",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "12",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "13",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "14",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "15",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "16",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "17",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "18",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "19",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    },
    {
        id: "20",
        longUrl: common_1.TEST_LONG_URL,
        shortUrl: common_1.TEST_SHORT_URL,
        clickCount: common_1.TEST_CLICK_COUNT,
        createdAt: date,
        createdBy: common_1.TEST_USER_ID
    }
];
exports.createShortUrlDto = {
    longUrl: common_1.TEST_LONG_URL
};
exports.E2E_URL_REDIRECTION_PARAM = '5c75d4ea';
exports.E2E_URL_CUSTOM_REDIRECTION_PARAM = 'newdomain-cf5b2b31';
exports.E2E_URL_ID = '98fa4581-1d29-4d4e-a4bf-9c59e872d527';
//# sourceMappingURL=url.fixture.js.map