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
import { ApiOperation } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all task' })
  @Get()
  findAll() {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'Get one task' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @ApiOperation({ summary: 'Post resource task' })
  @Post()
  create(@Body() CreateTaskDto: any) {
    return this.taskService.create(CreateTaskDto);
  }

  @ApiOperation({ summary: 'Update resource task' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateTaskDto: any) {
    return this.taskService.update(id, UpdateTaskDto);
  }

  @ApiOperation({ summary: 'Delete resource task' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
