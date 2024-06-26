import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MoviesModule } from './apis/movies/movies.module';
import { ActorsModule } from './apis/actors/actors.module';
import { PostersModule } from './apis/posters/posters.module';
import { VodsModule } from './apis/vods/vods.module';
import { DirectorsModule } from './apis/directors/directors.module';
import { GenresModule } from './apis/genres/genres.module';
import { BoxOfficeModule } from './apis/boxOffice/boxOffice.module';
import { BoxOfficeToMovieModule } from './apis/boxOfficeToMovie/boxOfficeToMovie.module';
import { StillsModule } from './apis/stills/stills.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { LikesModule } from './apis/likes/likes.module';
import { SeenModule } from './apis/seen/seen.module';
import { CommentsModule } from './apis/comments/comments.module';

@Module({
  imports: [
    ActorsModule,
    AuthModule,
    BoxOfficeModule,
    BoxOfficeToMovieModule,
    CommentsModule,
    DirectorsModule,
    GenresModule,
    LikesModule,
    MoviesModule,
    PostersModule,
    SeenModule,
    StillsModule,
    UsersModule,
    VodsModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        console.log(error);
        return error;
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
