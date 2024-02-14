import { Test, TestingModule } from '@nestjs/testing';
import { CronjobService } from './cronjob.service';
import { UrlService } from '../url/url.service';
import { TEST_USER_ID } from '../common';
import { URL_FIXTURE } from '../../test/fixtures';

describe('CronjobService', () => {
  let cronjobService: CronjobService;
  const mockUrlService = {
    cleanUp: jest.fn(),
    findAllUserUrls: jest.fn(),
    updateUserUrls: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronjobService,
        {
          provide: UrlService,
          useValue: mockUrlService
        }
      ],
    }).compile();

    cronjobService = module.get<CronjobService>(CronjobService);
  });

  it('should be defined', () => {
    expect(cronjobService).toBeDefined();
  });

  describe('handleCleanUpCron', () => {
    const userUrls1 = {
        userId: TEST_USER_ID,
        urls: [URL_FIXTURE[0], URL_FIXTURE[1]]
    };
    const userUrls2 = {
      userId: TEST_USER_ID,
      urls: [URL_FIXTURE[2]]
    };    
    test('clean up database', async() => {
      mockUrlService.findAllUserUrls.mockImplementation(() => [
        userUrls1,
        userUrls2
      ]);
      await cronjobService.handleCleanUpCron();
      expect(mockUrlService.updateUserUrls).toHaveBeenCalled()
    });
  });
});
