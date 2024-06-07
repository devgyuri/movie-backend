import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/apis/users/dto/profile';

@ObjectType()
export class AuthInfo {
  @Field(() => String)
  accessToken: string;

  @Field(() => Profile)
  profile: Profile;
}
