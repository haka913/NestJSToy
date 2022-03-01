import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies:Movie[]=[];

    getAll():Movie[]{
        return this.movies;
    }

    getOne(id:number):Movie{
        // parseInt() 와 같은 것 +id
        // return this.movies.find(movie=> movie.id === parseInt(id));
        // const movie = this.movies.find(movie=> movie.id === parseInt(id));
        const movie = this.movies.find(movie=> movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id:number){
        this.getOne(id);
        // this.movies=this.movies.filter(movie=> movie.id!== +id);
        this.movies=this.movies.filter(movie=> movie.id!== id);
        // return true;
    }

    create(movieDate: CreateMovieDto){
        this.movies.push({
            id: this.movies.length+1,
            ...movieDate,
        });
    }

    update(id: number, updateData: UpdateMovieDto){
        const movie=this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
