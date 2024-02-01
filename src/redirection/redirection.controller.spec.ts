import { Test, TestingModule } from '@nestjs/testing';
import { RedirectionController } from './redirection.controller';

describe('RedirectionController', () => {
  let controller: RedirectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectionController],
    }).compile();

    controller = module.get<RedirectionController>(RedirectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
