import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersModule,
  ],
  controllers: [AuthController], //
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
