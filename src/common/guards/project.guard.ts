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
import { ErrorResponseDto } from '../dto';
import { TaskService } from 'src/controllers/task/task.service';
import { EventService } from 'src/controllers/event/event.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly eventService: EventService,
  ) {}

  async checkTaskEventAccess(req: any): Promise<number | ErrorResponseDto> {
    const path = req.route.path;
    try {
      if (req.params.id) {
        if (path.includes('task')) {
          const project = await this.taskService.findOne(req.params.id);
          if (project instanceof ErrorResponseDto) {
            throw new NotFoundException(project.message);
          } else {
            return project.data.projectId;
          }
        } else if (path.includes('event')) {
          const project = await this.eventService.findOne(req.params.id);
          if (project instanceof ErrorResponseDto) {
            throw new NotFoundException(project.message);
          } else {
            return project.data.projectId;
          }
        }
      } else {
        throw new BadRequestException('ID is required');
      }
    } catch (error) {
      throw new ErrorResponseDto({
        message: error.message,
      });
    }
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
    const path = request.route.path;
    const user = request.user;

    console.log(path);

    const projectId = parseInt(
      request.params.id
        ? request.params.id
        : request.body.projectId
          ? request.body.projectId
          : this.checkTaskEventAccess(request),
    );

    const project = await this.projectService.findOne(projectId);
    const collaborator = await this.projectService.getCollaborators(projectId);

    if (project instanceof ErrorResponseDto) {
      throw new NotFoundException(project.message);
    } else {
      const isOwner = project.data.userId === user.id;
      const isCollaborator = collaborator.data.some(
        (c) => c.userId === user.id,
      );

      if (!isOwner && !isCollaborator) {
        throw new ForbiddenException('Access to this project is forbidden');
      }
    }

    return true;
  }
}
