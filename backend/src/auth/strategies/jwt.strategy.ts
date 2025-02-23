import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Secret key from .env
    });
  }

  async validate(payload: any) {
    // If the token is valid, return the user data
    return { userId: payload.sub, email: payload.email }; // Attach user info from token
  }
}
