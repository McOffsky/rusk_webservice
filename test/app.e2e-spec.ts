import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/jokes (GET)', () => {
    return request(app.getHttpServer())
      .get('/jokes')
      .expect(200)
      .expect((res) => {
        if (res.body.length < 1) {
          throw new Error('response does not contain any data');
        }
      });
  });
});
