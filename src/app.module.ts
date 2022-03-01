import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
// app.module의 경우  AppService 와 AppController 만 가져야함
// 나머지들은 모듈로 이동시켜야함 -> imports로
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
