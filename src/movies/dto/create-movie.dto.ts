// dto 사용 이유: 코드 간결
// nest js가 들어오는 쿼리에 대해 유효성을 검사할 수 있게 해줌
import {IsNumber, IsOptional, IsString} from 'class-validator';
export class CreateMovieDto{
    @IsString()
    readonly title:string;
    @IsNumber()
    readonly year:number;

    @IsOptional()
    @IsString({each: true})
    readonly genres: string[];
}