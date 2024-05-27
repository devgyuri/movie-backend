import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { AxiosError } from 'axios';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    // default exception
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외가 발생했어요.',
    };

    // http exception
    if (exception instanceof HttpException) {
      error.status = exception.getStatus();
      error.message = exception.message;
    }
    // axios exception
    else if (exception instanceof AxiosError) {
      error.status = exception.response.status;
      error.message = exception.response.data.message;
    }

    console.log('===============');
    console.log('예외가 발생했어요!');
    console.log('예외내용: ', error.message);
    console.log('예외코드: ', error.status);
    console.log('===============');

    throw new ApolloError(error.message, error.status.toString());
  }
}
