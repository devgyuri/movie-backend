import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoxOffice } from 'src/apis/boxOffice/entities/boxOffice.entity';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoxOfficeToMovie {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => BoxOffice, (boxOffice) => boxOffice.boxOfficeToMovies)
  @Field(() => BoxOffice)
  boxOffice: BoxOffice;

  @ManyToOne(() => Movie, (movie) => movie.boxOfficeToMovies, { eager: true })
  @Field(() => Movie)
  movie: Movie;

  @Column({ type: 'int' })
  @Field(() => Int)
  rank: number;
}
