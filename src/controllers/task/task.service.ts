import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Project, ProjectCollaborator, Task } from 'src/common/models';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private readonly taskModel: typeof Task,
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
  ) {}

  async getAllByProject(req: Request): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const userId = req['user'].id;
      const ownedTasks = await this.projectModel.findAll({
        where: { userId },
        attributes: ['id', 'name'],
        include: [
          {
            model: Task,
          },
        ],
      });
      const collabTasks = await this.projectModel.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: ProjectCollaborator,
            where: { userId: userId },
            attributes: [],
          },
          {
            model: Task,
          },
        ],
      });
      const tasks = {
        ownedTasks: ownedTasks,
        collabTasks: collabTasks,
      };
      if (ownedTasks.length === 0 && collabTasks.length === 0) {
        throw new NotFoundException('No tasks found');
      }
      return new ResponseDto({ data: tasks });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
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
    if (Object.keys(UpdateTaskDto).length === 0) {
      return new ErrorResponseDto({
        message: 'No fields to update',
        statusCode: 400,
        error: 'Bad Request',
      });
    }
    try {
      const response = await this.taskModel.update(
        { ...UpdateTaskDto },
        { where: { id } },
      );
      return new ResponseDto({
        data: {
          message: `Task with id ${id} successfully updated`,
          updated: response[0],
        },
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
    return new ResponseDto({
      data: {
        message: `Task with id ${id} successfully deleted`,
        deletedFields: response,
        statusCode: 200,
      },
    });
  }
}
