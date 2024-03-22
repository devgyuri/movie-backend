import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Genre {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  name: string;

  @ManyToMany(() => Movie, (movies) => movies.genres)
  @Field(() => [Movie])
  movies: Movie[];
}
