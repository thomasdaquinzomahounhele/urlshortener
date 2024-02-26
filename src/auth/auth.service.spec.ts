import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Subscription, TEST_EMAIL, TEST_FIRST_NAME, TEST_HASHED_PASSWORD, TEST_ID, TEST_LAST_NAME, TEST_PASSWORD, TEST_USER_ID, UserDto } from '../common';

describe('AuthService', () => {
  let authService: AuthService;
  const mockUserService = {
    findOneByEmail: jest.fn(),
  };
  const mockJwtService = {
    signAsync: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe("signIn", () => {
    const user: UserDto = {
      id: TEST_ID,
      userId: TEST_USER_ID,
      firstname: TEST_FIRST_NAME,
      lastname: TEST_LAST_NAME,
      email: TEST_EMAIL,
      hashedpassword: TEST_HASHED_PASSWORD,
      subscription: Subscription.Free
    };
    
    describe('case user credentials are correct', () => {
      test('returns acces token', async() => {
        mockUserService.findOneByEmail.mockReturnValue(user);
        const result = await authService.signIn(TEST_EMAIL, TEST_PASSWORD);
        expect(result).toEqual(
          expect.objectContaining({
            access_token: undefined
          })
        );
      });
    });

    describe('case user credentials are incorrect', () => {
      test('returns acces token', async() => {
        mockUserService.findOneByEmail.mockReturnValue(user);
        const result = await authService.signIn(TEST_EMAIL, 'wrong_password');
        expect(result).toEqual({ success: false, message: 'Credentials incorrect' });
      });
    })
  });
});
