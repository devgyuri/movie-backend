import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IUsersServiceCreateUser,
  IUsersServiceFindOneById,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindProfile,
  IUsersServiceUpdateUser,
  IUsersServiceFindOneByName,
  IUsersServiceIsDuplicatedName,
  IUsersServiceUploadPicture,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';
import { Profile } from './dto/profile';
import { Url } from './dto/url';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findProfile({ id }: IUsersServiceFindProfile): Promise<Profile> {
    const result = await this.findOneById({ id });

    return {
      id: result.id,
      name: result.name,
      picture: result.picture,
      email: result.email,
    };
  }

  findOneById({ id }: IUsersServiceFindOneById): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  findOneByName({ name }: IUsersServiceFindOneByName): Promise<User> {
    return this.usersRepository.findOne({
      where: { name },
    });
  }

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser({
    createUserInput: createUserInput,
  }: IUsersServiceCreateUser): Promise<boolean> {
    const user = await this.findOneByEmail({ email: createUserInput.email });
    if (user) {
      throw new ConflictException('이미 등록한 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    const result = await this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
    });

    return result !== null;
  }

  async updateUser({
    id,
    updateUserInput,
  }: IUsersServiceUpdateUser): Promise<Profile> {
    console.log('hello');

    const prevUser = await this.findOneById({ id });

    const result = await this.usersRepository.save({
      ...prevUser,
      ...updateUserInput,
    });

    return {
      id: result.id,
      name: result.name,
      picture: result.picture,
      email: result.email,
    };
  }

  async isDuplicatedName({
    name,
  }: IUsersServiceIsDuplicatedName): Promise<boolean> {
    const result = await this.findOneByName({ name });

    return result !== null;
  }

  async uploadPicture({
    id,
    picture,
  }: IUsersServiceUploadPicture): Promise<Url> {
    console.log(picture);

    const user = await this.findOneById({ id });

    const storage = new Storage({
      projectId: 'glassy-song-425702',
      keyFilename: 'glassy-song-425702-j8-27ad38cad9b7.json',
    }).bucket('example121232');

    picture
      .createReadStream()
      .pipe(storage.file(picture.filename).createWriteStream())
      .on('finish', () => {
        console.log('업로드 성공');
      })
      .on('error', () => {
        console.log('업로드 실패');
      });
    console.log('파일 전송이 완료되었습니다.');

    return { url: picture.filename };
  }
}
