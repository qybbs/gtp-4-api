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
import { TaskService } from './task.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreatedResponse,
  EmptyRequestResponse,
  GetAllSuccessResponse,
  InvalidTokenResponse,
  NotFoundResponse,
  ProjectForbiddenResponse,
} from 'src/common/responses';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ProjectGuard } from 'src/common/guards';
import { Unguard } from 'src/common/decorators';

@UseGuards(ProjectGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Unguard()
  @Get()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get all task',
    description: 'Retrieve all task owned by the logged-in user',
  })
  @ApiOkResponse(GetAllSuccessResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  findAll(@Req() req: Request) {
    return this.taskService.getAll(req);
  }

  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get one task',
    description: 'Retrieve a task by ID',
  })
  @ApiOkResponse(GetAllSuccessResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Post resource task',
    description: 'Create a new task',
  })
  @ApiCreatedResponse(CreatedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  create(@Body() CreateTaskDto: CreateTaskDto) {
    return this.taskService.create(CreateTaskDto);
  }

  @ApiBearerAuth('Access Token')
  @ApiOperation({ summary: 'Update resource task' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, UpdateTaskDto);
  }

  @ApiBearerAuth('Access Token')
  @ApiOperation({ summary: 'Delete resource task' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
