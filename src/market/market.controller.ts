import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Json } from '../response/json';

@Controller('/market')
export class MarketController {
    constructor(
        @Inject('MARKET_SERVICE') private readonly client: ClientProxy,
    ) { }

    @UseGuards(FirebaseAuthGuard)
    @Get('/listings')
    listings() {
        return this.client.send({ cmd: 'listings:latest' }, {})
            .pipe(map(data => Json.success({ data })));
    }
}
