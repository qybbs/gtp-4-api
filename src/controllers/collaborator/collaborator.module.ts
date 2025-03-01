import { Module } from '@nestjs/common';
import { CollaboratorController } from './collaborator.controller';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';
import { EventService } from '../event/event.service';
import { CollaboratorService } from './collaborator.service';
import {
  collaboratorProvider,
  eventProvider,
  projectProvider,
  taskProvider,
} from 'src/common/providers';

@Module({
  imports: [],
  controllers: [CollaboratorController],
  providers: [
    ProjectService,
    TaskService,
    EventService,
    CollaboratorService,
    projectProvider,
    taskProvider,
    eventProvider,
    collaboratorProvider,
  ],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
