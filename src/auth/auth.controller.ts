import { Body, Controller, Get, HttpException, Inject, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { map } from 'rxjs';
import { ResponseService } from '../response/response.service';

@Controller('/auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
        private readonly configService: ConfigService,
        private readonly responseService: ResponseService
    ) { }

    @Post('/login')
    async login(
        @Body('token') token,
        @Res() response: Response
    ) {
        const cookieName = `${this.configService.get<string>('app.name')}_session`;

        return this.client.send({ cmd: 'auth.login' }, token)
            .pipe(map(result => {
                this.responseService.throwIfError(result);

                return response.cookie(cookieName, result.data.sessionCookie, {
                    httpOnly: true,
                    secure: true
                }).json({ data: { user: result.data.user } })
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
                this.responseService.throwIfError(result);

                return response.json({ data: { user: result.data.user } });
            }));
    }
}
