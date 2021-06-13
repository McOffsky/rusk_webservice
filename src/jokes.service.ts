import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class JokesService {
  constructor(private httpService: HttpService) {}

  getJokes(limit = 100): Promise<string[]> {
    return new Promise((resolve) => {
      this.httpService.get('http://bash.org.pl/text').toPromise().then((response) => {
        resolve(response.data.split('%\n').slice(0, limit));
      });
    });
  }
}
