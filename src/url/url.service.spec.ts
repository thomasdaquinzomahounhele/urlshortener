import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { FUNCTION } from './function';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { 
  Subscription,
  TEST_EMAIL,
  TEST_FIRST_NAME,
  TEST_ID,
  TEST_LAST_NAME,
  TEST_LONG_URL,
  TEST_PASSWORD,
  TEST_SHORT_URL,
  TEST_USER_ID, 
  TotalLinks, 
  UserDto, 
  UserUrl 
} from '../common';
import { URL_FIXTURE } from '../../test/fixtures';
import { NotAcceptableException } from '@nestjs/common';

describe('UrlService', () => {
  let urlService: UrlService;
  const mockUserUrlRepository = {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    insertMany: jest.fn(),
    find: jest.fn()
  };
  const mockUrlRepository = {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    insertMany: jest.fn(),
    deleteMany: jest.fn()
  };
  const mockUserService = {
    findOneByUserId: jest.fn(),
  };
  const mockUrlShortener = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: FUNCTION,
          useValue: mockUrlShortener
        },
        {
          provide: getModelToken('Url'),
          useValue: mockUrlRepository
        },
        {
          provide: getModelToken('UserUrl'),
          useValue: mockUserUrlRepository
        },
        {
          provide: UserService,
          useValue: mockUserService
        }
      ],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  const userUrls: Partial<UserUrl> = {
    userId: TEST_USER_ID,
    urls: [URL_FIXTURE[0]]
  };

  describe("findOneUrl", () => {
    test('returns url', async() => {
      mockUrlRepository.findOne.mockReturnValue(URL_FIXTURE[0]);
      const result = await urlService.findOneUrl(TEST_ID);
      expect(result).toEqual(URL_FIXTURE[0])
    });
  });

  describe('findUserUrls', () => {
    test('returns userUrls', async() => {
      mockUserUrlRepository.findOne.mockReturnValue(userUrls);
      const result: UserUrl = await urlService.findUserUrls(TEST_USER_ID);
      expect(result).toEqual(userUrls)
    });
  });

  describe('isAllowed', () => {
    describe("user has no shortUrl in the db yet", () => {
      test('returns true', async() => {
        mockUserUrlRepository.findOne.mockReturnValue(null);
        const result = await urlService.isAllowed(TEST_USER_ID, Subscription.Free);
        expect(result).toEqual(true);
      })
    });

    describe('case user with Free subscription', () => {
      test(`returns true when number of url less than ${TotalLinks.Free}`, async() => {
        mockUserUrlRepository.findOne.mockReturnValue(userUrls);
        const result = await urlService.isAllowed(TEST_USER_ID, Subscription.Free);
        expect(result).toEqual(true);
      });

      test(`returns true when number of url more than or equal to ${TotalLinks.Free}`, async() => {
        const longUserUrls: UserUrl = {
          userId: TEST_USER_ID,
          urls: URL_FIXTURE
        };
        mockUserUrlRepository.findOne.mockReturnValue(longUserUrls);
        const result = await urlService.isAllowed(TEST_USER_ID, Subscription.Free);
        expect(result).toEqual(false);
      });
    });

    describe('case user with Intermediate subscription', () => {
      test(`returns true when number of url less than ${TotalLinks.Intermediate}`, async() => {
        mockUserUrlRepository.findOne.mockReturnValue(userUrls);
        const result = await urlService.isAllowed(TEST_USER_ID, Subscription.Free);
        expect(result).toEqual(true);
      });
    });

    describe('case user with Premium subscription', () => {
      test(`returns true when number of url less than ${TotalLinks.Premium}`, async() => {
        mockUserUrlRepository.findOne.mockReturnValue(userUrls);
        const result = await urlService.isAllowed(TEST_USER_ID, Subscription.Free);
        expect(result).toEqual(true);
      });
    });
  });

  describe('createShortenedUrl', () => {
    const user: UserDto = {
      id: TEST_ID,
      userId: TEST_USER_ID,
      firstname: TEST_FIRST_NAME,
      lastname: TEST_LAST_NAME,
      email: TEST_EMAIL,
      hashedpassword: TEST_PASSWORD,
      subscription: Subscription.Free
    };
    beforeEach(() => {
      mockUserService.findOneByUserId.mockReturnValue(user);
    });

    describe('when user is allowed', () => {
      describe('when url is not valid', () => {
      test('throws error', async() => {
         expect( async() => {
          await urlService.createShortenedUrl({ longUrl: 'invalid_url' }, { sub: TEST_USER_ID});
        }).rejects.toThrow(NotAcceptableException);
      });
      });
      
      describe('when user has no shortUrl in the db yet', () => {
        test('returns success message', async() => {
          mockUrlShortener.mockImplementation(() => ({ 
            shortUrl: TEST_SHORT_URL, 
            message: `Url successfully shortened !! Get it at: localhost:3001/url/${TEST_ID}`
          }));
          mockUrlRepository.findOne.mockReturnValue(URL_FIXTURE[0]);
          mockUserUrlRepository.findOne
          .mockImplementationOnce(() => null)
          .mockImplementationOnce(() => null)
          .mockImplementationOnce(() => userUrls)
        
          const result = await urlService.createShortenedUrl({ longUrl: TEST_LONG_URL }, { sub: TEST_USER_ID});
          expect(result).toEqual({
            message: `Url successfully shortened !! Get it at: localhost:3001/url/${TEST_ID}`
          })
        });
      })
      
      describe('when user totalLinks is less than limit', () => {
        test('returns success message', async() => {
          mockUrlShortener.mockImplementation(() => ({ 
            shortUrl: TEST_SHORT_URL, 
            message: `Url successfully shortened !! Get it at: localhost:3001/url/${TEST_ID}`
          }));
          mockUrlRepository.findOne.mockReturnValue(URL_FIXTURE[0]);
          mockUserUrlRepository.findOne
          .mockImplementationOnce(() => userUrls)
          .mockImplementationOnce(() => userUrls)
        
          const result = await urlService.createShortenedUrl({ longUrl: TEST_LONG_URL }, { sub: TEST_USER_ID});
          expect(result).toEqual({
            message: `Url successfully shortened !! Get it at: localhost:3001/url/${TEST_ID}`
          })
        });
      })
    });

    describe('when user is not allowed cause number of links more thatn limit', () => {
      test('when user has no shortUrl in the db yet', async() => {

        mockUserUrlRepository.findOne.mockReturnValueOnce({
          userId: TEST_USER_ID,
          urls: URL_FIXTURE
        });
        const result = await urlService.createShortenedUrl({ longUrl: TEST_LONG_URL }, { sub: TEST_USER_ID});
        expect(result).toEqual({
          message: 'You have reached the limit of short links you can create this month !! Upgrade your subscription plan for more. See our offers here: localhost:3001/subscription'
        })
      });
    });
  });

  describe('getShortenedUrl', () => {
    test('returns shortenedUrl', async() => {
      mockUrlRepository.findOne.mockReturnValue(URL_FIXTURE[0]);
      const result = await urlService.getShortenedUrl(TEST_ID);
      expect(result).toEqual({ shortUrl: URL_FIXTURE[0].shortUrl })
    });
  });

  describe("incrementClickCount", () => {
    describe('case normal url', () => {
      test('returns updatedUserUrl', async() => {
        mockUrlRepository.findOne
        .mockReturnValueOnce(URL_FIXTURE[0])
        .mockReturnValueOnce(null);
        mockUrlRepository.findOneAndUpdate.mockReturnValue(URL_FIXTURE[0]);
        const result = await urlService.incrementClickCount(TEST_ID);
        expect(result).toEqual(URL_FIXTURE[0]);
      })
    }); 

    describe('case custom url', () => {
      test('returns updatedUserUrl', async() => {
        mockUrlRepository.findOne
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(URL_FIXTURE[0]);
        mockUrlRepository.findOneAndUpdate.mockReturnValue(URL_FIXTURE[0]);
        const result = await urlService.incrementClickCount(TEST_ID);
        expect(result).toEqual(URL_FIXTURE[0]);
      })
    }); 
  })

  describe('updateUserUrls', () => {
    describe('case userUrls exits', () => {
      test('updates user', async() => {
        mockUserUrlRepository.findOne.mockReturnValue(userUrls);
        const updatedUrls = [...userUrls.urls];
        updatedUrls.push(URL_FIXTURE[1]);
        const updatedUserUrls = {
          userId: userUrls.userId,
          urls: updatedUrls
        };
        mockUserUrlRepository.findOneAndUpdate.mockReturnValue(updatedUserUrls)
        const result = await urlService.updateUserUrlsWithNewUrl(TEST_USER_ID, URL_FIXTURE[1]);
        expect(result).toEqual(updatedUserUrls);
      });
    });

    describe('case no exisitingUserUrls', () => {
      test('creates new userUrl', async() => {
        mockUserUrlRepository.findOne
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => userUrls)

        const result = await urlService.updateUserUrlsWithNewUrl(TEST_USER_ID, URL_FIXTURE[0]);
        expect(result).toEqual(userUrls);
      });
    });
  });

  describe('updateUserUrlsClickCount', () => {
    test('updates url clickCount', async() => {
      mockUserUrlRepository.findOne.mockReturnValue(userUrls);
      const result = await urlService.updateUserUrlsClickCount(TEST_USER_ID, URL_FIXTURE[1]);
      expect(mockUserUrlRepository.findOneAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
        userId: userUrls.userId,
        urls: [
          URL_FIXTURE[0],
          URL_FIXTURE[1]
        ]
      })
      );
    });
  });

  describe('cleanUp', () => {
    test('clean up database', async() => {
      await urlService.cleanUp({});
      expect(mockUrlRepository.deleteMany).toHaveBeenCalledWith({});
    });
  });

  describe('findAllUserUrls', () => {
    test('returns all urls', async() => {
      await urlService.findAllUserUrls();
      expect(mockUserUrlRepository.find).toHaveBeenCalledWith({});
    });
  });
});
