import { Test, TestingModule } from '@nestjs/testing';
import { CustomDomainRedirectionController } from './custom-domain-redirection.controller';
import { CustomDomainRedirectionService } from './custom-domain-redirection.service';
import { TEST_ID, TEST_LONG_URL } from '../common';

describe('CustomDomainRedirectionController', () => {
  let controller: CustomDomainRedirectionController;

  const fakeLongUrl = {
    longUrl: TEST_LONG_URL,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomDomainRedirectionController],
      providers: [
        {
          provide: CustomDomainRedirectionService,
          useValue: {
            redirect: jest.fn().mockReturnValue(fakeLongUrl)
          }
        }
      ]
    }).compile();

    controller = module.get<CustomDomainRedirectionController>(CustomDomainRedirectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('redirect', async () => {
    const result = controller.redirect(TEST_ID);
    expect(result).toEqual(fakeLongUrl);
  });
});
