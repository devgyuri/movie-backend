import { ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class Profile extends OmitType(User, [
  'password',
  'likes',
  'comments',
]) {}
