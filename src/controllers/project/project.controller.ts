import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all project' })
  @Get()
  @ApiOkResponse({
    isArray: true,
  })
  findAll() {
    return this.projectService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one project' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Get(':id')
  @ApiOkResponse({
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post resource project' })
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() CreateProjectDto: CreateProjectDto) {
    return this.projectService.create(CreateProjectDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update resource project' })
  @Patch(':id')
  @ApiOkResponse({
    description: 'Project with id ${id} successfully updated',
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  update(@Param('id') id: number, @Body() UpdateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, UpdateProjectDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete resource project' })
  @Delete(':id')
  @ApiOkResponse({
    description: 'Project with id ${id} successfully deleted',
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  delete(@Param('id') id: number) {
    return this.projectService.delete(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Invite project collaborator' })
  @Post('/collaborator')
  @ApiCreatedResponse({
    description: 'Invite Succesfully',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  inviteCollaborator(
    @Query('userId') userId: number,
    @Query('projectId') projectId: number,
  ) {
    return this.projectService.addCollaborator({ userId, projectId });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove project collaborator' })
  @Delete('/collaborator')
  @ApiOkResponse({
    description: 'Remove Succesfully',
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  removeCollaborator(
    @Query('userId') userId: number,
    @Query('projectId') projectId: number,
  ) {
    return this.projectService.removeCollaborator({ userId, projectId });
  }
}
