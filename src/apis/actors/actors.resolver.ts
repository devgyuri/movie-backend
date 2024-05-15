import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';

@Resolver()
export class ActorsResolver {
  constructor(
    private readonly actorsService: ActorsService, //
  ) {}

  @Query(() => String)
  fetchActor(): string {
    return 'dummy fetch actor';
  }

  @Query(() => String)
  fetchActorImage(@Args('name') name: string): Promise<string> {
    return this.actorsService.fetchImage({ name });
  }

  @Mutation(() => Actor)
  updateActorImage(
    @Args('id') id: number,
    @Args('url') url: string, //
  ): Promise<Actor> {
    return this.actorsService.updateUrl({ id, url });
  }
}
