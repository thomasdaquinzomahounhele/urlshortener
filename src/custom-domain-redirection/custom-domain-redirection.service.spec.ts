import { Test, TestingModule } from '@nestjs/testing';
import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
import { UrlService } from '../url/url.service';
import { TEST_ID, TEST_LONG_URL } from '../common';

describe('CustomDomainRedirectionService', () => {
  let customRedirectionService: CustomDomainRedirectionService;
  const mockUrlService = {
    incrementClickCount: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomDomainRedirectionService,
        {
          provide: UrlService,
          useValue: mockUrlService
        }
      ],
    }).compile();

    customRedirectionService = module.get<CustomDomainRedirectionService>(CustomDomainRedirectionService);
  });

  it('should be defined', () => {
    expect(customRedirectionService).toBeDefined();
  });

  describe('redirect', () => {
    test('returns longUrl', async() => {
      mockUrlService.incrementClickCount.mockReturnValue({ longUrl: TEST_LONG_URL });
      const result = await customRedirectionService.redirect(TEST_ID);
      expect(result).toEqual({
        longUrl: TEST_LONG_URL,
      });
    });
  });
});
