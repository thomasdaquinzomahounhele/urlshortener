import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { 
  SignUpDto, 
  Subscription, 
  TEST_EMAIL, 
  TEST_FIRST_NAME, 
  TEST_LAST_NAME, 
  TEST_PASSWORD, 
  UpdateUserDto,
  UpgradeSubscriptionPlanDto
} from '../common';
import { Request } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = {
    signUp: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    upgradeSubscription: jest.fn(),
    getUserDashboard: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
