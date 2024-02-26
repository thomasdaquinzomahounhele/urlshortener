import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { TEST_ID, TEST_SHORT_URL } from '../common';
import { getModelToken } from '@nestjs/mongoose';
import { FUNCTION } from './function';
import { UserService } from '../user/user.service';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        UserService,
        {
          provide: UrlService,
          useClass: UrlService
        },
        {
          provide: getModelToken('User'),
          useValue: {}
        },
        {
          provide: getModelToken('Url'),
          useValue: {}
        },
        {
          provide: getModelToken('UserUrl'),
          useValue: {}
        },
        {
          provide: FUNCTION,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
