import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneById,
  IUsersServiceFindOneByEmail,
  IProfile,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneById({ id }: IUsersServiceFindOneById): Promise<IProfile> {
    const result = await this.usersRepository.findOne({
      where: { id },
    });

    return {
      id: result.id,
      name: result.name,
      picture: result.picture,
      email: result.email,
    };
  }

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
  }: IUsersServiceCreate): Promise<boolean> {
    const user = await this.findOneByEmail({ email });
    if (user) {
      throw new ConflictException('이미 등록한 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
    });

    return result !== null;
  }
}
