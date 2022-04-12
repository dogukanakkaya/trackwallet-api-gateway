import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { map } from 'rxjs';
import { CustomAuthGuard } from '../auth/custom-auth.guard';

@Controller('/market')
export class MarketController {
    constructor(
        @Inject('MARKET_SERVICE') private readonly client: ClientProxy,
    ) { }

    @UseGuards(CustomAuthGuard)
    @Get('/listings')
    listings(
        @Res() response: Response,
    ) {
        return this.client.send({ cmd: 'listings.latest' }, {})
            .pipe(map(result => {
                return response.json({ data: { listings: result.listings } });
            }));
    }
}
