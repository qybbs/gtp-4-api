import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {
  collaboratorProvider,
  eventProvider,
  projectProvider,
  taskProvider,
} from 'src/common/providers';
import { TaskService } from '../task/task.service';
import { EventService } from '../event/event.service';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    TaskService,
    EventService,
    projectProvider,
    taskProvider,
    eventProvider,
    collaboratorProvider,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
