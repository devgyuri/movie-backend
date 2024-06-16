import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  ICommentsServiceCreateComment,
  ICommentsServiceDeleteComment,
  ICommentsServiceFindCommentById,
  ICommentsServiceFindCommentByUserAndMovie,
  ICommentsServiceFindCommentsByMovie,
  ICommentsServiceUpdateComment,
} from './interfaces/commnets-service.interface';
import { MoviesService } from '../movies/movies.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Id } from './dto/id';
import { UPDATE_STAR_STATUS_ENUM } from '../movies/interfaces/movies-service.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //
    private readonly moviesService: MoviesService,
  ) {}

  findCommentById({
    commentId,
  }: ICommentsServiceFindCommentById): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });
  }

  findCommentByUserAndMovie({
    userId,
    movieId,
  }: ICommentsServiceFindCommentByUserAndMovie): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: {
        user: { id: userId },
        movie: { id: movieId },
      },
    });
  }

  findCommentsByMovie({
    movieId,
  }: ICommentsServiceFindCommentsByMovie): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: {
        movie: {
          id: movieId,
        },
      },
    });
  }

  async createComment({
    userId,
    createCommentInput,
  }: ICommentsServiceCreateComment): Promise<Comment> {
    await this.moviesService.updateStar({
      id: createCommentInput.movieId,
      star: createCommentInput.star,
      updateStatus: UPDATE_STAR_STATUS_ENUM.CREATE,
    });

    const { movieId, ...commentInput } = createCommentInput;

    return this.commentsRepository.save({
      ...commentInput,
      movie: {
        id: movieId,
      },
      user: {
        id: userId,
      },
    });
  }

  async updateComment({
    userId,
    updateCommentInput,
  }: ICommentsServiceUpdateComment): Promise<Comment> {
    const prevComment = await this.findCommentById({
      commentId: updateCommentInput.id,
    });

    if (userId !== prevComment.user.id) {
      throw new ForbiddenException('작성자만 수정이 가능합니다.');
    }

    await this.moviesService.updateStar({
      id: prevComment.movie.id,
      star: (updateCommentInput.star ?? prevComment.star) - prevComment.star,
      updateStatus: UPDATE_STAR_STATUS_ENUM.UPDATE,
    });

    return this.commentsRepository.save({
      ...prevComment,
      user: {
        ...prevComment.user,
      },
      movie: {
        ...prevComment.movie,
      },
      ...updateCommentInput,
    });
  }

  async deleteComment({
    commentId,
  }: ICommentsServiceDeleteComment): Promise<Id> {
    const comment = await this.findCommentById({ commentId });

    await this.moviesService.updateStar({
      id: comment.movie.id,
      star: -comment.star,
      updateStatus: UPDATE_STAR_STATUS_ENUM.DELETE,
    });

    await this.commentsRepository.delete({ id: commentId });
    return { id: commentId };
  }
}
