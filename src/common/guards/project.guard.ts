import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectService } from 'src/controllers/project/project.service';
import { UNGUARD_KEY } from '../decorators';
import { ResponseDto } from '../dto';
import { TaskService } from 'src/controllers/task/task.service';
import { EventService } from 'src/controllers/event/event.service';
import { Request } from 'express';
import { Event, Task } from '../models';
import { console } from 'inspector';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly eventService: EventService,
  ) {}

  async checkProjectId(req: Request): Promise<number> {
    const path = req.route.path;
    let projectId: number;
    if (path.includes('project')) {
      projectId = req.params.id
        ? req.params.id
        : req.body.projectId
          ? req.body.projectId
          : null;
      if (!projectId) {
        throw new BadRequestException('Project ID is required');
      }
    } else if (path.includes('task')) {
      let task: ResponseDto<Task>;
      if (req.params.id) {
        const taskId = parseInt(req.params.id);
        task = await this.taskService.findOne(taskId);
        if (!task.data) {
          throw new NotFoundException(`Task with id ${taskId} is not found`);
        }
      }
      projectId =
        task && task.data?.projectId
          ? task.data.projectId
          : req.body.projectId
            ? req.body.projectId
            : null;
      if (!projectId) {
        console.log(task);
        throw new BadRequestException('Project ID is required');
      }
    } else if (path.includes('event')) {
      let event: ResponseDto<Event>;
      if (req.params.id) {
        const eventId = parseInt(req.params.id);
        event = await this.eventService.findOne(eventId);
        if (!event.data) {
          throw new NotFoundException(`Event with id ${eventId} is not found`);
        }
      }
      projectId =
        event && event.data?.projectId
          ? event.data.projectId
          : req.body.projectId
            ? req.body.projectId
            : null;
      if (!projectId) {
        throw new BadRequestException('Project ID is required');
      }
    } else {
      projectId = req.query.projectId
        ? req.query.projectId
        : req.body.projectId;
      if (!projectId) {
        throw new BadRequestException('Project ID is required');
      }
    }

    const project = await this.projectService.findOne(projectId);

    return project.data.id;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const unGuard = this.reflector.getAllAndOverride<boolean>(UNGUARD_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (unGuard) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    let projectId: number;
    try {
      projectId = await this.checkProjectId(request);
    } catch (error) {
      throw new NotFoundException(error.response);
    }

    const project = await this.projectService.findOne(projectId);

    const collaborator = await this.projectService.getCollaborators(projectId);
    const isOwner = project.data.userId === user.id;
    const isCollaborator = collaborator.data.some(
      (c: { userId: number }) => c.userId === user.id,
    );

    if (!isOwner && !isCollaborator) {
      throw new ForbiddenException('Access to this project is forbidden');
    }

    return true;
  }
}
