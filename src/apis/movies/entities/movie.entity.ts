import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Movie {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => Date)
  open_dt: Date;

  @Column('int')
  @Field(() => Int)
  audi_acc: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @Field(() => Float)
  avg_star: number;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  rating: string;

  @Column('text')
  @Field(() => String)
  plot: string;
}
