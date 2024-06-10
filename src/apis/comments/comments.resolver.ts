import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { IContext } from 'src/commons/interfaces/context';
import { CreateCommentInput } from './dto/create-comment.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @Query(() => String)
  FetchComment(): string {
    return 'dummy fetch comment';
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  CreateComment(
    @Context() context: IContext, //
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentsService.createComment({
      userId: Number(context.req.user.id),
      createCommentInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  DeleteComment(
    @Context() context: IContext,
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.commentsService.deleteComment({
      userId: Number(context.req.user.id),
      movieId,
    });
  }
}
