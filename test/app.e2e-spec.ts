import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true,
      transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies",()=>{
    it("GET", ()=>{
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });

    it("POST 201", ()=>{
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"Test",
          year:2000,
          genres:['test']
        })
        .expect(201);
    });
    it("POST 400", ()=>{
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"Test",
          year:2000,
          genres:['test'],
          other:"thing"
        })
        .expect(400);
    });

    it("DELETE", ()=>{
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    })

  });

  describe("/movies/:id", ()=>{
    // it.todo('GET');


    // 실제 사용되는 서버에서의 id 타입은 number고
    // 테스트에서는 string일까?
    // ->main.ts에서 pipe의 transform이 실제 서버에서는 원하는 타입으로 바꿔주지만
    // 테스트에서는 그렇지 않음
    // -> e2e test에서 beforeAll을 보면 app 생성시  pipe를 올리지 않음(아래처럼)
    // app = moduleFixture.createNestApplication();
    // 테스트에서도 실제 어플리케이션 환경을 그대로 적용시켜야 됨

    it('Get 200', ()=>{
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    })
    it('Get 404', ()=>{
      return request(app.getHttpServer())
        .get("/movies/999")
        .expect(404);
    })
    // it.todo('PATCH');
    it("PATCH 200", ()=>{
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({title:"Updated Test"})
        .expect(200);

    });
    it("DELETE 200", ()=>{
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
    
  });

  
});
