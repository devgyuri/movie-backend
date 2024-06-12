import { CreateCommentInput } from '../dto/create-comment.input';

export interface ICommentsServiceFindCommentById {
  commentId: number;
}

export interface ICommentsServiceFindCommentByUserAndMovie {
  userId: number;
  movieId: string;
}

export interface ICommentsServiceFindCommentsByMovie {
  movieId: string;
}

export interface ICommentsServiceCreateComment {
  userId: number;
  createCommentInput: CreateCommentInput;
}

export interface ICommentsServiceDeleteComment {
  commentId: number;
}
