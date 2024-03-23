import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BoxOffice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Date)
  date: Date;

  @JoinTable()
  @ManyToMany(() => Movie, (movies) => movies.boxOffice)
  @Field(() => [Movie])
  movies: Movie[];
}
