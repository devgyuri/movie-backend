import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  contents: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Float)
  star: number;

  @Field(() => String)
  movieId: string;
}
