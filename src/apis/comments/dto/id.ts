import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Id {
  @Field(() => Int)
  id: number;
}
