import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Actor {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  name: string;

  // @Column({ type: 'varchar', length: 10 })
  // @Field(() => String)
  // code: string;

  // @Column({ type: 'varchar', length: 100 })
  // @Field(() => String)
  // url: string;

  @ManyToMany(() => Movie, (movies) => movies.actors)
  @Field(() => [Movie])
  movies: Movie[];
}
