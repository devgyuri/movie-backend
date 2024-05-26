import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Seen {
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
