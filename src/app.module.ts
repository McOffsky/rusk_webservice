import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JokesService } from './jokes.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [JokesService],
})
export class AppModule {}
