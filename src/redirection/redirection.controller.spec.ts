import { Test, TestingModule } from '@nestjs/testing';
import { RedirectionController } from './redirection.controller';
import { RedirectionService } from './redirection.service';
import { TEST_ID, TEST_LONG_URL } from '../common';

describe('RedirectionController', () => {
  let controller: RedirectionController;

  const fakeLongUrl = {
    longUrl: TEST_LONG_URL,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectionController],
      providers: [
        {
          provide: RedirectionService,
          useValue: {
            redirect: jest.fn().mockReturnValue(fakeLongUrl)
          }
        }
      ]
    }).compile();

    controller = module.get<RedirectionController>(RedirectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('redirect', async () => {
    const result = controller.redirect(TEST_ID);
    expect(result).toEqual(fakeLongUrl);
  });
});
