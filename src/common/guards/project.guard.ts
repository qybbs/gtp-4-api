import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectService } from 'src/controllers/project/project.service';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly projectService: ProjectService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const projectId = parseInt(request.params.id);

    const project = await this.projectService.findOne(projectId);
    const collaborator = await this.projectService.getCollaborators(projectId);

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    console.log(project.data);
    const isOwner = project.data.userId === user.id;
    const isCollaborator = collaborator.data.some((c) => c.userId === user.id);

    if (!isOwner && !isCollaborator) {
      throw new ForbiddenException('Access to this project is forbidden');
    }

    return true;
  }
}
