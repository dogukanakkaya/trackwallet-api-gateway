import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { FirebaseService } from '../firebase/firebase.service';
import { Json } from '../response/json';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly firebaseService: FirebaseService,
        private readonly configService: ConfigService
    ) { }

    @Post('/login')
    async tokenLogin(
        @Res() response: Response,
        @Body('token') token
    ) {
        try {
            const sessionCookie = await this.authService.getSessionCookie(token);
            const cookieName = `${this.configService.get<string>('app.name', 'app')}_session`;
            const user = await this.authService.verifySessionCookie(sessionCookie);

            const usersRef = this.firebaseService.firestore.collection('users');

            // check the user exists and create new if not
            const userByEmail = await usersRef.where('email', '==', user.email).get();

            if (userByEmail.size === 0) {
                await usersRef.doc(user.uid).set({
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                    sign_in_provider: user.firebase.sign_in_provider,
                    email_verified: user.email_verified,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            return response.cookie(cookieName, sessionCookie, {
                httpOnly: true,
                secure: true
            }).json(Json.success({ data: user }));
        } catch ({ code, message }) {
            return response.status(401).json(Json.error({ error: { code, message } }));
        }
    }

    @Get('verify')
    async tokenVerify(
        @Req() request: Request,
        @Res() response: Response
    ) {
        try {
            const sessionCookie = request.cookies[`${this.configService.get<string>('app.name', 'app')}_session`];
            const user = await this.authService.verifySessionCookie(sessionCookie);

            return response.json(Json.success({ data: user }));
        } catch ({ code, message }) {
            return response.status(401).json(Json.error({ code, message }));
        }
    }
}
