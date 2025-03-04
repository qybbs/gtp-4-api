import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  CreatedResponse,
  DeletedResponse,
  EmptyRequestResponse,
  GetAllNotFoundResponse,
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
  @ApiNotFoundResponse(GetAllNotFoundResponse)
  findAll(@Req() req: Request) {
    return this.projectService.getAll(req);
  }

  @Get(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get one project',
    description: 'Retrieve a project by projectId',
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
}
