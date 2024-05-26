import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  @Field(() => Movie)
  movie: Movie;
}
