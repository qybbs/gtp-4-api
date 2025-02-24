import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {
  collaboratorProvider,
  eventProvider,
  projectProvider,
  taskProvider,
} from 'src/common/providers';
import { ProjectService } from '../project/project.service';
import { EventService } from '../event/event.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    ProjectService,
    TaskService,
    EventService,
    projectProvider,
    taskProvider,
    eventProvider,
    collaboratorProvider,
  ],
  exports: [TaskService],
})
export class TaskModule {}
