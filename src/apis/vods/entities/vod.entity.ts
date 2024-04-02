import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Vod {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  url: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isRep: boolean;

  @ManyToOne(() => Movie, (movie) => movie.vods)
  @Field(() => Movie)
  movie: Movie;
}
