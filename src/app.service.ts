import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('CRYPTO_MARKET_SERVICE') private readonly client: ClientProxy,
  ) { }

  getHello() {
    return this.client.send({ cmd: 'listings:latest' }, {});
  }
}
