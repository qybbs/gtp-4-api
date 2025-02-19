import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config';
import { AuthProvider } from 'src/common/providers';

@Module({
  imports: [UserModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, AuthProvider],
  exports: [AuthService],
})
export class AuthModule {}
