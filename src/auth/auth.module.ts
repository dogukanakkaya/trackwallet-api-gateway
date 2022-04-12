import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { CustomStrategy } from './custom.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
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
