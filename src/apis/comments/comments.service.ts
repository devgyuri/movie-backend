import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  ICommentsServiceCreateComment,
  ICommentsServiceDeleteComment,
  ICommentsServiceFindCommentById,
  ICommentsServiceFindCommentByUserAndMovie,
  ICommentsServiceFindCommentsByMovie,
} from './interfaces/commnets-service.interface';
import { MoviesService } from '../movies/movies.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Id } from './dto/id';

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
      isCreate: true,
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

  async deleteComment({
    commentId,
  }: ICommentsServiceDeleteComment): Promise<Id> {
    const comment = await this.findCommentById({ commentId });

    await this.moviesService.updateStar({
      id: comment.movie.id,
      star: comment.star,
      isCreate: false,
    });

    await this.commentsRepository.delete({ id: commentId });
    return { id: commentId };
  }
}
