import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// url Entry point 를 컨트롤
// -> :3000/movies로 이동해야됨
@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    // Express 앱에 접근 방법 -> @Req() @Res() decorator를 사용
    // 하지만 많이 사용하지 않는 걸 권장(Fastify위에서도 동작하므로)
    // getAll(@Req() req, @Res() res) :Movie[]{
    getAll() :Movie[]{
        // return "This will return all movies";
        return this.moviesService.getAll();
    }

    // @Get("/search")
    // search(@Query("year") searchingYear: string){
    //     return `We are searching for a movie made after :${searchingYear}`;
    // }

// http://localhost:3000/movies/1
// Get("/:{name}")와 @param("{name}")의 name이 같아야 함
    @Get("/:id")
    getOne(@Param("id") movieId: number): Movie{
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData:CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    removeMovie(@Param('id') movieId:number){
        // return `This will delete a movie with id : ${movieId}`;
        return this.moviesService.deleteOne(movieId);
    }
    // update
    // Put의 경우 모든 리소스 업데이트
    // 일부 리소스 업데이트시 Patch
    @Patch('/:id')
    patchMovie(@Param('id') movieId: number, @Body() updateData:UpdateMovieDto){
        // return `This will patch a movie with id : ${movieId}`;
        // return {updatedMovie: movieId,
        // ...updateData    };
        return this.moviesService.update(movieId,updateData);
    }

    

}
