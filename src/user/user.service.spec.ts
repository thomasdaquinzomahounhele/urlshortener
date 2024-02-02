import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { SignUpDto, TEST_EMAIL } from '../common';

describe('UserService', () => {
  const mockRepository = {
    findOne: jest.fn(),
    signUp: jest.fn(),
  };

  let service: UserService;
  let userRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    const email = TEST_EMAIL;

    describe('when user exists', () => {
      test('returns user', async() => {
        const expectedUser = {}; 
        mockRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findOne(email);
        expect(user).toEqual(expectedUser);

      });
    });

    describe("when user doesn't exists", () => {
      test('returns undefined', async() => {
        mockRepository.findOne.mockReturnValue(undefined);
        const user = await service.findOne(email);
        expect(user).toEqual(undefined);
      });
    });
  });

  describe("signUp", () => {
    const dto: SignUpDto = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };

    describe('when user already exists', () => {
      test.todo('returns user already exist message');
    });

    describe('when new user', () => {
      test.todo('return success message');
    })
  });

  describe("getProfile", () => {
    test.todo('returns user profile');
  });

  describe("updateProfile", () => {
    test.todo('returns updated user profile');
  });

  describe("upgradeSubscription", () => {
    test.todo('returns success message');
  });
});
