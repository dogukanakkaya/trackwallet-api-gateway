import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { map } from 'rxjs';
import { User } from '../auth/auth.decorator';
import { CustomAuthGuard } from '../auth/custom-auth.guard';
import { ResponseService } from '../response/response.service';
import type { User as UserType } from '@shared/types/user.types';

@Controller('/market')
export class MarketController {
    constructor(
        @Inject('MARKET_SERVICE') private readonly client: ClientProxy,
        private readonly responseService: ResponseService
    ) { }

    @UseGuards(CustomAuthGuard)
    @Get('/listings')
    listings(@Res() response: Response) {
        return this.client.send({ cmd: 'coinmarketcap.listings' }, {})
            .pipe(map(result => {
                this.responseService.throwIfError(result);

                return response.json({ data: { listings: result.data.listings } });
            }));
    }
}