import { AuthGuard } from '@Nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlAuthGuard = (name) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      console.log('GqlAuthAccessGuard');
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
  };
};
