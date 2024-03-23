import { Query, Resolver } from '@nestjs/graphql';
import { PostersService } from './posters.service';

@Resolver()
export class PostersResolver {
  constructor(
    private readonly postersService: PostersService, //
  ) {}

  @Query(() => String)
  fetchPoster(): string {
    return 'dummy fetch poster';
  }
}
