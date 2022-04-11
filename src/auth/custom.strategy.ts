import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
    private readonly configService: ConfigService
  ) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const sessionCookie = request.cookies[`${this.configService.get<string>('app.name', 'app')}_session`];

    return this.client.send({ cmd: 'auth.verify' }, sessionCookie).subscribe(({ data }) => {
      if ('user' in data) {
        return data.user;
      }

      throw new UnauthorizedException();
    });
  }
}