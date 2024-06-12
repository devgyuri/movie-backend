import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['user', 'movie'])
@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 200 })
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Date)
  created_at: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  @Field(() => Float)
  star: number;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.comments, { eager: true })
  @Field(() => Movie)
  movie: Movie;
}
