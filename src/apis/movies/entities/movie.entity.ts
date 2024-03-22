import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
