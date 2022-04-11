import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV || 'dev'}.env`,
      load: [config]
    }),
    MarketModule,
    AuthModule
  ]
})
export class AppModule { }
