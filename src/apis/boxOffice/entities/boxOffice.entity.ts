import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoxOfficeToMovie } from 'src/apis/boxOfficeToMovie/entities/boxOfficeToMovie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoxOffice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Date)
  date: Date;

  @OneToMany(
    () => BoxOfficeToMovie,
    (boxOfficeToMovie) => boxOfficeToMovie.movie,
    { eager: true },
  )
  @Field(() => [BoxOfficeToMovie])
  boxOfficeToMovies: BoxOfficeToMovie[];
}
