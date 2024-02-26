import { Test, TestingModule } from '@nestjs/testing';
import { RedirectionService } from './redirection.service';
import { UrlService } from '../url/url.service';
import { TEST_ID, TEST_LONG_URL } from '../common';

describe('RedirectionService', () => {
  let redirectionService: RedirectionService;
  const mockUrlService = {
    incrementClickCount: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedirectionService,
        {
          provide: UrlService,
          useValue: mockUrlService
        }
      ],
    }).compile();

    redirectionService = module.get<RedirectionService>(RedirectionService);
  });

  it('should be defined', () => {
    expect(redirectionService).toBeDefined();
  });

  describe('redirect', () => {
    test('returns longUrl', async() => {
      mockUrlService.incrementClickCount.mockReturnValue({ longUrl: TEST_LONG_URL });
      const result = await redirectionService.redirect(TEST_ID);
      expect(result).toEqual({
        longUrl: TEST_LONG_URL,
      });
    });
  });
});
