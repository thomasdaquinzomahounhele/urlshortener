import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { 
  GetUserProfileOutput,
  SignUpDto, 
  Subscription, 
  TEST_EMAIL, 
  TEST_FIRST_NAME, 
  TEST_LAST_NAME, 
  TEST_PASSWORD, 
  UpdateUserDto,
  UpgradeSubscriptionPlanDto
} from '../common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UrlService } from '../url/url.service';
import { FUNCTION } from '../url/function';
import { signUpdto } from '../../test/fixtures';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [ 
        UserService,
        UrlService,
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

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const expectedAnswer = { 
    message: 'You have successfully signed up. You can shorten your links right after signing in at localhost:3001/auth/signin'
  };

  test('signUp', async () => {
    jest.spyOn(service, "signUp").mockResolvedValue(expectedAnswer);

    const result = await controller.signUp(signUpdto);
    expect(result).toEqual(expectedAnswer);
  });

  // test('getProfile', async () => {
  //   const fakeProfile: GetUserProfileOutput = {
  //     firstname: TEST_FIRST_NAME,
  //     lastname: TEST_LAST_NAME,
  //     email: TEST_EMAIL,
  //     subscriptionPlan: Subscription.Free
  //   };

  //   jest.spyOn(service, "getProfile").mockResolvedValue(fakeProfile);

  //   const result = await controller.getProfile({} as Request);
  //   expect(result).toEqual(expectedAnswer);
  // });
});
