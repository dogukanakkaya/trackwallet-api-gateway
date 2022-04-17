import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { CustomStrategy } from './custom.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth-service',
          port: 8081
        }
      }
    ]),
    PassportModule
  ],
  providers: [CustomStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
