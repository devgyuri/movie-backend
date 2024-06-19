import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IOAuthUser } from './interfaces/auth-service.interface';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    console.log('google login');
    return this.authService.loginOAuth({ req, res });
  }
}
