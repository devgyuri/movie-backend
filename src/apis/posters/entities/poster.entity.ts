import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Poster {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  url: string;

  @ManyToOne(() => Movie)
  @Field(() => Movie)
  movie: Movie;
}
