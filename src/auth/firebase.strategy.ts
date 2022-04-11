import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const sessionCookie = request.cookies['auth'];

    const user = await this.authService.verifySessionCookie(sessionCookie);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}