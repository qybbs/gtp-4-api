import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Request } from 'express';
import { CreateProjectDto } from './dto/create-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectGuard } from 'src/common/guards';
import { Unguard } from 'src/common/decorators';
import {
  CollabAddedResponse,
  CollabRemovedResponse,
  CreatedResponse,
  DeletedResponse,
  EmptyRequestResponse,
  GetAllSuccessResponse,
  GetSuccessResponse,
  InvalidTokenResponse,
  NotFoundResponse,
  ProjectForbiddenResponse,
  UpdatedResponse,
} from 'src/common/responses';

@UseGuards(ProjectGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Unguard()
  @Get()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get all projects',
    description: 'Retrieve all projects owned by the logged-in user',
  })
  @ApiOkResponse(GetAllSuccessResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  findAll(@Req() req: Request) {
    return this.projectService.getAll(req);
  }

  @Unguard()
  @Get('/collaborating')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get Collab Projects',
    description:
      'Retrieve all projects that the logged-in user is collaborating on',
  })
  @ApiOkResponse(GetAllSuccessResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  getCollaboratingProjects(@Req() req: Request) {
    return this.projectService.getCollaboratingProjects(req);
  }

  @Get(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get one project',
    description: 'Retrieve a project by projectId',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse(GetSuccessResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Unguard()
  @Post()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Post resource project',
    description: 'Create a new project',
  })
  @ApiCreatedResponse(CreatedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  create(@Body() CreateProjectDto: CreateProjectDto, @Req() req: Request) {
    return this.projectService.create(CreateProjectDto, req);
  }

  @Patch(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Update resource project',
    description: 'Update project by projectId',
  })
  @ApiOkResponse(UpdatedResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  update(@Param('id') id: number, @Body() UpdateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, UpdateProjectDto);
  }

  @Delete(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Delete resource project',
    description: 'Delete project by projectId',
  })
  @ApiOkResponse(DeletedResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  delete(@Param('id') id: number) {
    return this.projectService.delete(id);
  }

  @Get('/collaborators/:projectId')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get project collaborators',
    description: 'Get all collaborators in a project by projectId',
  })
  @ApiOkResponse(GetAllSuccessResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  getCollaborators(@Param('projectId') projectId: number) {
    return this.projectService.getCollaborators(projectId);
  }

  @Post('/collaborator')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Invite project collaborator',
    description: 'Invite a user to collaborate on a project',
  })
  @ApiOkResponse(CollabAddedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  inviteCollaborator(
    @Query('userId') userId: number,
    @Query('projectId') projectId: number,
  ) {
    return this.projectService.addCollaborator({ userId, projectId });
  }

  @Delete('/collaborator')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Remove project collaborator',
    description: 'Remove a user from a project',
  })
  @ApiOkResponse(CollabRemovedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  removeCollaborator(
    @Query('userId') userId: number,
    @Query('projectId') projectId: number,
  ) {
    return this.projectService.removeCollaborator({ userId, projectId });
  }
}
