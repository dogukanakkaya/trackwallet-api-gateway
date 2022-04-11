import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MarketController } from './market.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MARKET_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8082
        }
      }
    ])
  ],
  controllers: [MarketController]
})
export class MarketModule { }
