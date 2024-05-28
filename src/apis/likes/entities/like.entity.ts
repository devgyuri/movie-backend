import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@ObjectType()
@Unique(['user', 'movie'])
export class Like {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.likes)
  @Field(() => Movie)
  movie: Movie;
}
