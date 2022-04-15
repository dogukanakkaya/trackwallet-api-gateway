import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MarketModule } from './market/market.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { ResponseModule } from './response/response.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV || 'dev'}.env`,
      load: [config]
    }),
    MarketModule,
    AuthModule,
    UserModule,
    CryptoModule,
    ResponseModule
  ]
})
export class AppModule { }
