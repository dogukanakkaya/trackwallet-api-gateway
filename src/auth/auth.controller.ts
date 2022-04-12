import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { map } from 'rxjs';
import { Json } from '../response/json';

@Controller('/auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
        private readonly configService: ConfigService
    ) { }

    @Post('/login')
    async login(
        @Res() response: Response,
        @Body('token') token
    ) {
        const cookieName = `${this.configService.get<string>('app.name')}_session`;

        return this.client.send({ cmd: 'auth.login' }, token)
            .pipe(map(({ data }) => {
                return response.cookie(cookieName, data.sessionCookie, {
                    httpOnly: true,
                    secure: true
                }).json(Json.success({ data: data.user }));
            }));
    }

    @Get('verify')
    async verify(
        @Req() request: Request,
        @Res() response: Response
    ) {
        const sessionCookie = request.cookies[`${this.configService.get<string>('app.name')}_session`];

        return this.client.send({ cmd: 'auth.verify' }, sessionCookie)
            .pipe(map(({ data }) => {
                return response.json(Json.success({ data: data.user }));
            }));
    }
}
