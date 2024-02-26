import { 
    HttpStatus, 
    INestApplication, 
    ValidationPipe, 
    forwardRef 
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../src/auth/auth.guard";
import { UrlModule } from "../src/url/url.module";
import { UserModule } from "../src/user/user.module";
import * as request from "supertest";
import { 
    E2E_URL_CUSTOM_REDIRECTION_PARAM,
    E2E_URL_ID,
    E2E_URL_REDIRECTION_PARAM,
    createShortUrlDto,
    signUpdto, 
    updateUserDto, 
    upgradeSubscriptionPlanDto 
} from "./fixtures";
import { 
    CreateShortUrlDto, 
    SubscriptionPlanOutput, 
    TEST_JWT_TOKEN 
} from "../src/common";
import { SubscriptionModule } from "../src/subscription/subscription.module";
import { RedirectionModule } from "../src/redirection/redirection.module";
import { CustomDomainRedirectionModule } from "../src/custom-domain-redirection/custom-domain-redirection.module";

describe('app e2e test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [
            ConfigModule,
            UserModule,
            JwtModule,
            forwardRef(() => UrlModule),
            UrlModule,
            forwardRef(() => UserModule),
            SubscriptionModule,
            RedirectionModule,
            CustomDomainRedirectionModule,
            MongooseModule.forRoot("mongodb://localhost:27017/urlshortener"),
          ],
          providers: [
            {
              provide: APP_GUARD,
              useClass: AuthGuard
            }
          ]
        }).compile();
    
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
        }));
        await app.init();
    });

    test('signUp (POST)', async() => {
        return request(app.getHttpServer())
          .post('/user/signup')
          .send(signUpdto)
          .expect(HttpStatus.CREATED)
          .then(({body}) => {
            expect(body).toEqual({
              message: 'Email address already in use. Please choose a different email'
            });
        });
    });
    
    test('getProfile (GET)', async() => {
        return request(app.getHttpServer())
          .get('/user/profile')
          .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
          .then(({body}) => {
            expect(body).toEqual({
              firstname: 'test9firstname',
              lastname: 'test9lastname',
              email: 'newemail@gmail.com',
              subscriptionPlan: upgradeSubscriptionPlanDto.newPlan
            });
        });
    });
    
    test("updateProfile (POST)", async() => {
        return request(app.getHttpServer())
          .post("/user/update")
          .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
          .send(updateUserDto)
          .then(({ body }) => {
            expect(body).toEqual({
              firstname: 'test9firstname',
              lastname: 'test9lastname',
              email: updateUserDto.email,
              subscriptionPlan: upgradeSubscriptionPlanDto.newPlan
            });
        });
    });
    
    test("upgradeSubscription (POST)", async() => {
        return request(app.getHttpServer())
          .post("/user/upgrade")
          .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
          .send(upgradeSubscriptionPlanDto)
          .then(({ body }) => {
            expect(body).toEqual({
              message: `Now you can benefit from all the advantages of the #${upgradeSubscriptionPlanDto.newPlan} plan`
            });
        });
    });
    
    test("getUserDashboard (GET)", async() => {
        return request(app.getHttpServer())
          .get("/user/dashboard")
          .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
          .then(({ body }) => {
            expect(body).toMatchObject({
              message: {
                message: 'Want more control over your short links ? Upgrade your subscription plan',
                seeOurPlans: 'click here to see what we have for you: localhost:3001/subscription'
              }
            });
        });
    });

    describe('createShortenedUrl (POST)', () => {
        test('case invalid url', async () => {
            return request(app.getHttpServer())
                .post('/url/shortenUrl')
                .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
                .send({ longUrl: "" } as CreateShortUrlDto)
                .expect(HttpStatus.NOT_ACCEPTABLE)
                .then(({ body }) => {
                    expect(body).toMatchObject({
                        message: 'Please enter a valid url',
                        error: 'Verify if you copied the whole link. If you did !! Verify if your url actually works and directs to a website',
                    });
                });
        });

        test('case valid url', async () => {
            return request(app.getHttpServer())
                .post('/url/shortenUrl')
                .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
                .send(createShortUrlDto)
                .expect(HttpStatus.CREATED)
        });
    });

    test('getShortenedUrl (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/url/${E2E_URL_ID}`)
            .set('Authorization', `Bearer ${TEST_JWT_TOKEN}`) // Set the authorization header
            .then(({ body }) => {
                expect(body).toEqual({ shortUrl: 'localhost:3001/urlshortener/5c75d4ea' });
            });
    });
    
    test('getSubscriptionPlans (GET)', async () => {
        return request(app.getHttpServer())
            .get("/subscription")
            .then(({body}) => {
                expect(body).toEqual(SubscriptionPlanOutput());
            });
    });

    test('redirect (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/urlshortener/${E2E_URL_REDIRECTION_PARAM}`)
            .then(({body}) => {
                expect(body).toEqual({ longUrl: 'https://docs.nestjs.com/techniques' });
            });
    });
    
    test('redirect (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/${E2E_URL_CUSTOM_REDIRECTION_PARAM}`)
            .then(({body}) => {
                expect(body).toEqual({ longUrl: 'https://bcrypt-generator.com/' });
            });
    });
    
    afterAll(async () => {
        await app.close()
    });
});
