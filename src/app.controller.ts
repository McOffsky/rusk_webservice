import { Controller, Get, Query } from '@nestjs/common';
import { JokesQuery } from './DTO/JokesQuery';
import { JokesService } from './jokes.service';

@Controller()
export class AppController {
  constructor(
    private readonly jokesService: JokesService,
  ) {}

  @Get('jokes')
  async getJokes(@Query() query: JokesQuery): Promise<string[]> {
    return this.jokesService.getJokes(query.limit);
  }
}
