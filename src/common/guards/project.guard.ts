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
import { ErrorResponseDto, ResponseDto } from '../dto';
import { TaskService } from 'src/controllers/task/task.service';
import { EventService } from 'src/controllers/event/event.service';
import { Request } from 'express';
import { Event, Project, Task } from '../models';

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
    if (!req.params.id) {
      throw new BadRequestException('ID is required');
    }

    let projectId: number;
    let project: ResponseDto<Project> | ErrorResponseDto;
    if (path.includes('project')) {
      projectId = parseInt(req.params.id ? req.params.id : req.body.projectId);
      project = await this.projectService.findOne(projectId);
    } else if (path.includes('task')) {
      let task: ResponseDto<Task> | ErrorResponseDto;
      if (req.params.id) {
        const taskId = parseInt(req.params.id);
        task = await this.taskService.findOne(taskId);
        if (task instanceof ErrorResponseDto) {
          throw new NotFoundException(task.message);
        }
      }
      projectId = task.data?.projectId
        ? task.data.projectId
        : req.body.projectId;
      project = await this.projectService.findOne(projectId);
    } else if (path.includes('event')) {
      let event: ResponseDto<Event> | ErrorResponseDto;
      if (req.params.id) {
        const eventId = parseInt(req.params.id);
        event = await this.eventService.findOne(eventId);
        if (event instanceof ErrorResponseDto) {
          throw new NotFoundException(event.message);
        }
      }
      projectId = event.data?.projectId
        ? event.data.projectId
        : req.body.projectId;
      project = await this.projectService.findOne(projectId);
    }

    if (project instanceof ErrorResponseDto) {
      throw new NotFoundException(project.message);
    }

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
      throw new BadRequestException('Invalid project ID');
    }

    const project = await this.projectService.findOne(projectId);
    if (project instanceof ErrorResponseDto) {
      throw new NotFoundException(project.message);
    }

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
