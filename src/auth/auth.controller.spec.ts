import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { signInDto } from '../../test/fixtures';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    signIn: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('signIn', async () => {
    mockAuthService.signIn.mockReturnValue({
      access_token: "faketoken"
    });
    const result = controller.signIn(signInDto);
    expect(result).toEqual({
      access_token: "faketoken"
    });
  });
});
