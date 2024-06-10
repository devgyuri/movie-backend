import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  ICommentsServiceCreateComment,
  ICommentsServiceDeleteComment,
  ICommentsServiceFindCommentByUserAndMovie,
} from './interfaces/commnets-service.interface';
import { MoviesService } from '../movies/movies.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //
    private readonly moviesService: MoviesService,
  ) {}

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
    userId,
    movieId,
  }: ICommentsServiceDeleteComment): Promise<boolean> {
    const comment = await this.findCommentByUserAndMovie({ userId, movieId });

    await this.moviesService.updateStar({
      id: movieId,
      star: comment.star,
      isCreate: false,
    });

    const result = await this.commentsRepository.delete({ id: comment.id });
    return result != null;
  }
}
