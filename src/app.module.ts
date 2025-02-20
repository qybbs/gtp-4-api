import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/user/user.module';
import { MysqlModule } from './common/modules';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [MysqlModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
