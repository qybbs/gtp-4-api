import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Project, Task } from 'src/common/models';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private readonly taskModel: typeof Task,
  ) {}

  async getAll(req: Request): Promise<ResponseDto<Task[]>> {
    const userId = req['user'].id;
    const tasks = await this.taskModel.findAll({
      include: [
        {
          model: Project,
          attributes: [],
          where: { userId },
        },
      ],
    });
    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found');
    }
    return new ResponseDto<Task[]>({ data: tasks });
  }

  async findOne(id: number): Promise<ResponseDto<Task> | ErrorResponseDto> {
    try {
      const task = await this.taskModel.findOne({ where: { id } });
      return new ResponseDto<Task>({ data: task });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async create(CreateTaskDto: CreateTaskDto) {
    try {
      const response = await this.taskModel.create({ ...CreateTaskDto });
      return new ResponseDto({ data: response });
    } catch (error) {
      return new ErrorResponseDto({
        message: 'An error occurred',
        statusCode: 500,
        error: 'Internal Server Error',
      });
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
      return new ErrorResponseDto({
        message: error.message,
        statusCode: 400,
        error: error.name || 'Bad Request',
      });
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
