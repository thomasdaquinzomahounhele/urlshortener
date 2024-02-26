import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "../src/auth/auth.module";
import * as request from "supertest";
import { signInDto } from "./fixtures";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule, JwtService } from "@nestjs/jwt";

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                JwtModule.register({
                    secret: 'fake_jwt_secret', // Provide a valid secret key here
                }),
                MongooseModule.forRoot("mongodb://localhost:27017/urlshortener")
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('signIn (POST)', async () => {
        // return request(app.getHttpServer())
        //     .post('/auth/signin')
        //     .send(signInDto)
        //     .expect(HttpStatus.OK)
        //     .then(({body}) => {
        //         console.log(body);
        //     });
    });

    afterAll( async () => {
        await app.close();
    });
});
