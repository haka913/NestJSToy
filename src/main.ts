import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// nest js는 express위에서 동작함
// nest js는 두개의 프레임워크 위에서 작동하는데
// 기본적으로는 express, 다른 하나는 Fastify로 전환 가능
// Fastify가 express보다 2배 정도 빠르다

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사용 파이프
  // validationpipe의 옵션 
  // whitelist - true로 설정시 아무 decorator도 없는 어떠한 property의 object를 거름
  // forbidNonWhitelisted - 이상한 request를 보내면 그 자체를 막아버림
  // transform - 유저들이 보낸 것들을 우리가 원하는 실제 타입으로 변환
  // nestjs는 타입을 받아서 넘겨줄때 자동으로 타입을 변환해줌
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true,
    transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
