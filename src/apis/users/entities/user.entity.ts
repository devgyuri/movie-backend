import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/comments/entities/comment.entity';
import { Like } from 'src/apis/likes/entities/like.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  password: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  picture: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  @Field(() => [Like])
  likes: Like[];
}
