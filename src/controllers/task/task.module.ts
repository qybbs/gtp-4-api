import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { taskProvider } from 'src/common/providers';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, taskProvider],
  exports: [TaskService],
})
export class TaskModule {}
