import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { IContext } from 'src/commons/interfaces/context';
import { CreateCommentInput } from './dto/create-comment.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Id } from './dto/id';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @Query(() => String)
  fetchComment(): string {
    return 'dummy fetch comment';
  }

  @Query(() => [Comment])
  fetchComments(
    @Args('movieId') movieId: string, //
  ): Promise<Comment[]> {
    return this.commentsService.findCommentsByMovie({ movieId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  createComment(
    @Context() context: IContext, //
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentsService.createComment({
      userId: Number(context.req.user.id),
      createCommentInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  updateComment(
    @Context() context: IContext, //
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentsService.updateComment({
      userId: Number(context.req.user.id),
      updateCommentInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Id)
  deleteComment(
    @Args('commentId', { type: () => Int }) commentId: number,
  ): Promise<Id> {
    return this.commentsService.deleteComment({
      commentId,
    });
  }
}
