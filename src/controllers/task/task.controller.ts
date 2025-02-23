import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all task' })
  @ApiOkResponse({
    isArray: true,
  })
  @Get()
  findAll() {
    return this.taskService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one task' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post resource task' })
  @Post()
  create(@Body() CreateTaskDto: any) {
    return this.taskService.create(CreateTaskDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update resource task' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateTaskDto: any) {
    return this.taskService.update(id, UpdateTaskDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete resource task' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
