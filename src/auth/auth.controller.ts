import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { map } from 'rxjs';

@Controller('/auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
        private readonly configService: ConfigService
    ) { }

    @Post('/login')
    async login(
        @Body('token') token,
        @Res() response: Response
    ) {
        const cookieName = `${this.configService.get<string>('app.name')}_session`;

        return this.client.send({ cmd: 'auth.login' }, token)
            .pipe(map(result => {
                return response.cookie(cookieName, result.sessionCookie, {
                    httpOnly: true,
                    secure: true
                }).json({ data: { user: result.user } })
            }));
    }

    @Get('verify')
    async verify(
        @Req() request: Request,
        @Res() response: Response
    ) {
        const sessionCookie = request.cookies[`${this.configService.get<string>('app.name')}_session`];

        return this.client.send({ cmd: 'auth.verify' }, sessionCookie)
            .pipe(map(result => {
                return response.json({ data: { user: result.user } });
            }));
    }
}
