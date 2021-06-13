import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class JokesQuery {
  @IsNumber()
  @Type(() => Number)
  limit: number = 100;
}
