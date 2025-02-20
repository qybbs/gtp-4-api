import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all project' })
  @Get()
  @ApiOkResponse({
    isArray: true,
  })
  findAll() {
    return this.projectService.getAll();
  }

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

  @ApiOperation({ summary: 'Post resource project' })
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() CreateProjectDto: Record<string, any>) {
    return this.projectService.create(CreateProjectDto);
  }

  @ApiOperation({ summary: 'Update resource project' })
  @Patch(':id')
  @ApiOkResponse({
    description: 'Project with id ${id} successfully updated',
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  update(
    @Param('id') id: number,
    @Body() UpdateProjectDto: Record<string, any>,
  ) {
    return this.projectService.update(id, UpdateProjectDto);
  }

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
}
