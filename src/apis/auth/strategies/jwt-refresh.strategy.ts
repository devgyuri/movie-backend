import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToke=', '');
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
    };
  }
}
