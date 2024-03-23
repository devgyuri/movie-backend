import { Query, Resolver } from '@nestjs/graphql';
import { DirectorsService } from './directors.service';

@Resolver()
export class DirectorsResolver {
  constructor(
    private readonly directorsService: DirectorsService, //
  ) {}

  @Query(() => String)
  fetchActor(): string {
    return 'dummy fetch actor';
  }
}
