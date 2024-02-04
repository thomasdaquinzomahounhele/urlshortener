import { Test, TestingModule } from '@nestjs/testing';
import { CustomDomainRedirectionController } from './custom-domain-redirection.controller';

describe('CustomDomainRedirectionController', () => {
  let controller: CustomDomainRedirectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomDomainRedirectionController],
    }).compile();

    controller = module.get<CustomDomainRedirectionController>(CustomDomainRedirectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
