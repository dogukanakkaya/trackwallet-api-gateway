import { Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { map } from 'rxjs';
import { User } from '../auth/auth.decorator';
import { CustomAuthGuard } from '../auth/custom-auth.guard';
import { ResponseService } from '../response/response.service';

@Controller('/user')
export class UserController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
        private readonly responseService: ResponseService
    ) { }

    @UseGuards(CustomAuthGuard)
    @Get('/assets')
    async assets(@User() user, @Res() response: Response) {
        return this.client.send({ cmd: 'user.assets' }, user.id)
            .pipe(map(result => {
                this.responseService.throwIfError(result);

                console.log(result.data.assets);


                return response.json({ data: { assets: result.data.assets } });
            }));
    }
}
