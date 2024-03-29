import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/schema';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [
    forwardRef(() => UrlModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
