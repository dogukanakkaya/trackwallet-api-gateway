import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseStrategy } from './firebase.strategy';

@Module({
  imports: [FirebaseModule, PassportModule],
  providers: [AuthService, FirebaseStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
