import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/user/user.module';
import { MysqlModule, ValidatorModule } from './common/modules';
import { AuthModule } from './controllers/auth/auth.module';
import { ProjectModule } from './controllers/project/project.module';
import { TaskModule } from './controllers/task/task.module';
import { EventModule } from './controllers/event/event.module';

@Module({
  imports: [
    MysqlModule,
    UserModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    EventModule,
    ValidatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
