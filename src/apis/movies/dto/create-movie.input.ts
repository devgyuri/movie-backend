import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Date)
  open_dt: Date;

  @Field(() => Int)
  audi_acc: number;

  @Field(() => Float)
  avg_star: number;

  @Field(() => String)
  rating: string;

  @Field(() => String)
  plot: string;
}
