import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Director {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  name: string;

  // @Column({ type: 'varchar', length: 10 })
  // @Field(() => String)
  // code: string;

  @ManyToMany(() => Movie, (movies) => movies.directors)
  @Field(() => [Movie])
  movies: Movie[];
}
