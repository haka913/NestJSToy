import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // afterAll(()=>{
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{
    it('should return an array', ()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  // getOne이전에 생성되지않아 있으면 문제 발생
  describe("getOne", ()=>{
    
    it('should return a movie', ()=>{
      service.create({
        title:"test movie",
        genres:['test'],
        year:2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error',()=>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });

  });

  describe("deleteOne",()=>{
    it('deletes a movie', ()=>{
      service.create({
        title:"test movie",
        genres:['test'],
        year:2000,
      });
      // console.log(service.getAll());
      const beforeMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      // expect(afterDelete.length).toEqual(allMovies.length-1);
      expect(afterDelete.length).toBeLessThan(beforeMovies.length);

    });

    it('should return a 404', ()=>{
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", ()=>{
    it('should create a movie', ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title:"test movie",
        genres:['test'],
        year:2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", ()=>{
    it('should update a movie', ()=>{
      //반복적으로 만들기 귀찮다면
      // beforeEach에 넣으면 됨
      service.create({
        title:"test movie",
        genres:['test'],
        year:2000,
      });
      service.update(1, {title:"updated Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated Test");

    });
    it('should throw a NotFoundException', ()=>{
      try {
        service.update(999,{});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
