import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CryptoController } from './crypto.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRYPTO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'crypto-service',
          port: 8083
        }
      }
    ])
  ],
  controllers: [CryptoController]
})
export class CryptoModule { }
