import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Url {
  @Field(() => String)
  url: string;
}
