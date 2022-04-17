import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { User } from '../types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
    private readonly configService: ConfigService
  ) {
    super();
  }

  async validate(request: Request): Promise<User> {
    const sessionCookie = request.cookies[`${this.configService.get<string>('app.name')}_session`];

    if (!sessionCookie) {
      throw new UnauthorizedException();
    }

    const { data }: AuthVerifyResponse = await lastValueFrom(this.client.send({ cmd: 'auth.verify' }, sessionCookie));

    if ('user' in data) {
      return data.user;
    }

    throw new UnauthorizedException();
  }
}

export interface AuthVerifyResponse {
  data: {
    user: User;
  };
}