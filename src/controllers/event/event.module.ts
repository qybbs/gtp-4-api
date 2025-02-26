import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import {
  collaboratorProvider,
  eventProvider,
  projectProvider,
  taskProvider,
} from 'src/common/providers';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [
    ProjectService,
    TaskService,
    EventService,
    projectProvider,
    taskProvider,
    eventProvider,
    collaboratorProvider,
  ],
  exports: [EventService],
})
export class EventModule {}
