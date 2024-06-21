import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from 'src/apis/actors/entities/actor.entity';
import { BoxOfficeToMovie } from 'src/apis/boxOfficeToMovie/entities/boxOfficeToMovie.entity';
import { Comment } from 'src/apis/comments/entities/comment.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import { Like } from 'src/apis/likes/entities/like.entity';
import { Poster } from 'src/apis/posters/entities/poster.entity';
import { Seen } from 'src/apis/seen/entities/seen.entity';
import { Still } from 'src/apis/stills/entities/stills.entity';
import { Vod } from 'src/apis/vods/entities/vod.entity';
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

  @Column({ type: 'int' })
  @Field(() => Int)
  runtime: number;

  @OneToMany(
    () => BoxOfficeToMovie,
    (boxOfficeToMovie) => boxOfficeToMovie.movie,
  )
  @Field(() => [BoxOfficeToMovie])
  boxOfficeToMovies: BoxOfficeToMovie[];

  @JoinTable()
  @ManyToMany(() => Genre, (genres) => genres.movies, {
    cascade: true,
    eager: true,
  })
  @Field(() => [Genre])
  genres: Genre[];

  @JoinTable()
  @ManyToMany(() => Actor, (actors) => actors.movies, {
    cascade: true,
    eager: true,
  })
  @Field(() => [Actor])
  actors: Actor[];

  @JoinTable()
  @ManyToMany(() => Director, (directors) => directors.movies, {
    cascade: true,
    eager: true,
  })
  @Field(() => [Director])
  directors: Director[];

  @OneToMany(() => Poster, (poster) => poster.movie, { eager: true })
  @Field(() => [Poster])
  posters: Poster[];

  @OneToMany(() => Still, (still) => still.movie, { eager: true })
  @Field(() => [Still])
  stills: Still[];

  @OneToMany(() => Vod, (vod) => vod.movie, { eager: true })
  @Field(() => [Vod])
  vods: Vod[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.movie)
  @Field(() => [Like])
  likes: Like[];

  @OneToMany(() => Seen, (seen) => seen.movie)
  @Field(() => [Seen])
  seen: Seen[];
}
