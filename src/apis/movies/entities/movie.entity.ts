import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from 'src/apis/actors/entities/actor.entity';
import { BoxOffice } from 'src/apis/boxOffice/entities/boxOffice.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

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

  @JoinTable()
  @ManyToMany(() => BoxOffice, (boxOffice) => boxOffice.movies)
  @Field(() => [BoxOffice])
  boxOffice: BoxOffice[];

  @JoinTable()
  @ManyToMany(() => Genre, (genres) => genres.movies)
  @Field(() => [Genre])
  genres: Genre[];

  @JoinTable()
  @ManyToMany(() => Actor, (actors) => actors.movies)
  @Field(() => [Actor])
  actors: Actor[];

  @ManyToMany(() => Director, (directors) => directors.movies)
  @Field(() => [Director])
  directors: Director[];
}
