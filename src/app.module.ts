import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MarketModule,
    AuthModule
  ]
})
export class AppModule { }
