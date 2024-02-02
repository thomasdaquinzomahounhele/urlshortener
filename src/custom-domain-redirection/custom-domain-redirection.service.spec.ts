import { Test, TestingModule } from '@nestjs/testing';
import { CustomDomainRedirectionService } from './custom-domain-redirection.service';

describe('CustomDomainRedirectionService', () => {
  let service: CustomDomainRedirectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomDomainRedirectionService],
    }).compile();

    service = module.get<CustomDomainRedirectionService>(CustomDomainRedirectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
