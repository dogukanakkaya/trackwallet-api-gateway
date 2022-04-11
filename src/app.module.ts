import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    MarketModule
  ]
})
export class AppModule { }
