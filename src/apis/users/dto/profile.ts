import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  picture: string;
}
