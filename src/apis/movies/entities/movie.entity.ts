import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from 'src/apis/actors/entities/actor.entity';
import { BoxOfficeToMovie } from 'src/apis/boxOfficeToMovie/entities/boxOfficeToMovie.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Movie {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => Date)
  open_dt: Date;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  audi_acc: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  @Field(() => Float)
  avg_star: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  cnt_star: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  rating: number;

  @Column('text')
  @Field(() => String)
  plot: string;

  @OneToMany(
    () => BoxOfficeToMovie,
    (boxOfficeToMovie) => boxOfficeToMovie.boxOffice,
  )
  @Field(() => [BoxOfficeToMovie])
  boxOfficeToMovies: BoxOfficeToMovie[];

  @JoinTable()
  @ManyToMany(() => Genre, (genres) => genres.movies, {
    cascade: true,
  })
  @Field(() => [Genre])
  genres: Genre[];

  @JoinTable()
  @ManyToMany(() => Actor, (actors) => actors.movies, { cascade: true })
  @Field(() => [Actor])
  actors: Actor[];

  @JoinTable()
  @ManyToMany(() => Director, (directors) => directors.movies, {
    cascade: true,
  })
  @Field(() => [Director])
  directors: Director[];
}
