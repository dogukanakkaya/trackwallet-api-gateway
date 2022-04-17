import { Controller, Get, Inject, Param, Res, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { map } from 'rxjs';
import { CustomAuthGuard } from '../auth/custom-auth.guard';

@Controller('/crypto')
export class CryptoController {
    constructor(
        @Inject('CRYPTO_SERVICE') private readonly client: ClientProxy
    ) { }

    //@UseGuards(CustomAuthGuard)
    @Get('/:slug/balance/:address')
    balance(@Param('slug') slug: string, @Param('address') address: string, @Res() response: Response) {
        return this.client.send({ cmd: `${slug}.balance` }, address)
            .pipe(map(result => {
                return response.json({ data: { balance: result.data.balance } });
            }));
    }
}
