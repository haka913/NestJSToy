import { PartialType } from '@nestjs/mapped-types';
import {IsNumber, IsString} from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
// npm i @nestjs/mapped-types
// DTO(Data Transfer Object)를 변환하는데 도움을 줌
// 아래 주석과 같음
export class UpdateMovieDto extends PartialType(CreateMovieDto){

}

// export class UpdateMovieDto extends PartialType(CreateMovieDto){
//     // ?는 필수는 아님을 의미
//     @IsString()
//     readonly title?:string;
//     @IsNumber()
//     readonly year?:number;
//     @IsString({each: true})
//     readonly genres?: string[];
// }