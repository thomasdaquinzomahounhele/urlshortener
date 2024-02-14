import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { 
  SignUpDto, 
  Subscription, 
  TEST_EMAIL, 
  TEST_FIRST_NAME, 
  TEST_ID, 
  TEST_LAST_NAME, 
  TEST_LONG_URL, 
  TEST_PASSWORD, 
  TEST_SHORT_URL, 
  TEST_USER_ID, 
  UpdateUserDto, 
  User, 
  UserUrl
} from '../common';
import { UrlService } from '../url/url.service';

describe('UserService', () => {
  const mockUrlService = {
    findUserUrls: jest.fn()
  };

  const mockRepository = {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    insertMany: jest.fn()
  };

  let userService: UserService;
  let userRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockRepository
        },
        {
          provide: UrlService,
          useValue: mockUrlService
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(UserService).toBeDefined();
  });

  const User: Partial<User> = {
    userId: TEST_USER_ID,
    firstname: TEST_FIRST_NAME,
    lastname: TEST_LAST_NAME,
    email: TEST_EMAIL,
    hashedpassword: TEST_PASSWORD,
    subscription: Subscription.Free,
  };

  describe("findOneByEmail", () => {
    const email = TEST_EMAIL;

    describe('when user exists', () => {
      test('returns user', async() => {
        const expectedUser = {
          userId: TEST_USER_ID,
          firstname: TEST_FIRST_NAME,
          lastname: TEST_LAST_NAME,
          email: email,
          hashedpassword: TEST_PASSWORD,
          subscription: Subscription.Free,
        }; 
        mockRepository.findOne.mockReturnValue(expectedUser);
        const user = await userService.findOneByEmail(email);
        expect(user).toEqual(expectedUser);

      });
    });

    describe("when user doesn't exists", () => {
      test('returns undefined', async() => {
        mockRepository.findOne.mockReturnValue(undefined);
        const user = await userService.findOneByEmail(email);
        expect(user).toEqual(undefined);
      });
    });
  });

  describe("findOneByUserId", () => {
    const userId = TEST_USER_ID;

    describe('when user exists', () => {
      test('returns user', async() => {
        const expectedUser = {
          userId: userId,
          firstname: TEST_FIRST_NAME,
          lastname: TEST_LAST_NAME,
          email: TEST_EMAIL,
          hashedpassword: TEST_PASSWORD,
          subscription: Subscription.Free,
        }; 
        mockRepository.findOne.mockReturnValue(expectedUser);
        const user = await userService.findOneByUserId(userId);
        expect(user).toEqual(expectedUser);

      });
    });

    describe("when user doesn't exists", () => {
      test('returns undefined', async() => {
        mockRepository.findOne.mockReturnValue(undefined);
        const user = await userService.findOneByUserId(userId);
        expect(user).toEqual(undefined);
      });
    });
  });

  describe("signUp", () => {
    const dto: SignUpDto = {
      firstname: TEST_FIRST_NAME,
      lastname: TEST_LAST_NAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    };

    describe('when user already exists', () => {
      const existingUser: Partial<User> = {
        userId: TEST_USER_ID,
        firstname: TEST_FIRST_NAME,
        lastname: TEST_LAST_NAME,
        email: TEST_EMAIL,
        hashedpassword: TEST_PASSWORD,
        subscription: Subscription.Free,
      };
      test('returns user already exist message', async() => {
        mockRepository.findOne.mockReturnValue(existingUser)
        const result = await userService.signUp(dto);
        expect(result).toStrictEqual({ message: "Email address already in use. Please choose a different email" });
      });
    });

    describe('when new user', () => {
      const newUser: Partial<User> = {
        userId: TEST_USER_ID,
        firstname: TEST_FIRST_NAME,
        lastname: TEST_LAST_NAME,
        email: TEST_EMAIL,
        hashedpassword: TEST_PASSWORD,
        subscription: Subscription.Free,
      };
      test('return success message', async() => {
        mockRepository.findOne.mockReturnValue(undefined);
        mockRepository.insertMany.mockReturnValue(newUser);
        const result = await userService.signUp(dto);
        expect(result).toEqual({
          message: 'You have successfully signed up. You can shorten your links right after signing in at localhost:3001/auth/signin'
        })
      });
    });
  });

  describe("getProfile", () => {
    test('returns user profile', async() => {
      mockRepository.findOne.mockReturnValue(User);
      const result = await userService.getProfile({ sub: TEST_USER_ID });
      expect(result).toEqual({
        firstname: User.firstname,
        lastname: User.lastname,
        email: User.email,
        subscriptionPlan: User.subscription
      });
    });
  });

  describe("updateProfile", () => {
    const dto: UpdateUserDto = {
      firstname: TEST_FIRST_NAME,
      lastname: TEST_LAST_NAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    };
    let user: Partial<User>;
    test('returns updated user profile', async() => {
      mockRepository.findOneAndUpdate.mockImplementation(() => {
         user = {
          userId: TEST_USER_ID,
          firstname: dto.firstname,
          lastname: dto.lastname,
          email: dto.email,
          hashedpassword: dto.password,
          subscription: Subscription.Free,
        };
        return user;
      });
      const result = await userService.updateProfile({userId: TEST_USER_ID}, dto);
      expect(result).toEqual({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        subscriptionPlan: user.subscription
      })
    });
  });

  describe("upgradeSubscription", () => {
    test('returns success message', async() => {
      const result = await userService.upgradeSubscription(User, { newPlan: Subscription.Intermediate });
      expect(result).toEqual({
        message: 'Now you can benefit from all the advantages of the #Intermediate plan'
      });
    });
  });

  describe('getUserDashboard', () => {
    const date = new Date();
    const userUrl: Partial<UserUrl> = {
      urls: [{
        id: TEST_ID,
        longUrl: TEST_LONG_URL,
        shortUrl: TEST_SHORT_URL,
        clickCount: 3,
        createdBy: TEST_USER_ID,
        createdAt: date
      }]
    };
    test('returns dashboard', async() => {
      mockUrlService.findUserUrls.mockResolvedValue(userUrl);
      mockRepository.findOne.mockReturnValue(User);
      const result = await userService.getUserDashboard(User);
      expect(result).toEqual({
        UserUrls: [
          { longUrl: TEST_LONG_URL, shortUrl: TEST_SHORT_URL, createdAt: date }
        ],
        message: {
          message: 'Want more control over your short links ? Upgrade your subscription plan',
          seeOurPlans: 'click here to see what we have for you: localhost:3001/subscription'
        }
      })
    });
  });
});
