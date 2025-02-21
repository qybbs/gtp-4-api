import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Task } from 'src/common/models';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private readonly taskModel: typeof Task,
  ) {}

  async getAll(): Promise<ResponseDto<Task[]>> {
    const tasks = await this.taskModel.findAll();
    return new ResponseDto<Task[]>({ data: tasks });
  }

  async findOne(id: number): Promise<ResponseDto<Task>> {
    const task = await this.taskModel.findOne({ where: { id } });
    return new ResponseDto<Task>({ data: task });
  }

  async create(CreateTaskDto: CreateTaskDto) {
    try {
      const response = await this.taskModel.create({ ...CreateTaskDto });
      return new ResponseDto({ data: response });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'Task with this name already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto) {
    try {
      const response = await this.taskModel.update(
        { ...UpdateTaskDto },
        { where: { id } },
      );
      if (response[0] === 0) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return new ResponseDto({
        data: `Task with id ${id} successfully updated`,
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'Task with this name already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    const response = await this.taskModel.destroy({ where: { id } });
    if (response === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return new ResponseDto({
      data: `Task with id ${id} successfully deleted`,
    });
  }
}
