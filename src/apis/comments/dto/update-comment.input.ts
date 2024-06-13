import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { CreateCommentInput } from './create-comment.input';

@InputType()
export class UpdateCommentInput extends PartialType(
  OmitType(CreateCommentInput, ['created_at']),
) {
  @Field(() => Int)
  id: number;
}
