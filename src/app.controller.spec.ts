import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { JokesService } from './jokes.service';

describe('AppController', () => {
  let appController: AppController;
  let jokesService: JokesService;
  let httpModule: HttpModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [JokesService],
    }).compile();

    appController = app.get<AppController>(AppController);
    jokesService = app.get<JokesService>(JokesService);
    httpModule = app.get<HttpModule>(HttpModule);
  });

  describe('getJokes', () => {
    const jokesQuery = {
      limit: 100
    }

    it('should return promise', () => {
      expect(appController.getJokes(jokesQuery)).toBeInstanceOf(Promise);
    });

    it('should contain at least "USD"', async () => {
      const result = ['joke1', 'joke2', 'joke3'];
      jest
        .spyOn(jokesService, 'getJokes')
        .mockImplementation((): Promise<string[]> => Promise.resolve(result));

      expect(await appController.getJokes(jokesQuery)).toBe(result);
    });
  });
});
