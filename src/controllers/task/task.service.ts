import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dto';
import { Project, ProjectCollaborator, Task } from 'src/common/models';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private readonly taskModel: typeof Task,
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
  ) {}

  async getAllByProject(req: Request): Promise<ResponseDto> {
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

    const allOwnedTasksEmpty = ownedTasks.every(
      (project) => project.tasks.length === 0,
    );
    const allCollabTasksEmpty = collabTasks.every(
      (project) => project.tasks.length === 0,
    );

    if (allOwnedTasksEmpty && allCollabTasksEmpty) {
      throw new NotFoundException('No tasks found');
    }

    const tasks = {
      ownedTasks: ownedTasks,
      collabTasks: collabTasks,
    };

    return new ResponseDto({
      statusCode: 200,
      message: 'Tasks found',
      data: tasks,
    });
  }

  async findOne(id: number): Promise<ResponseDto<Task>> {
    const task = await this.taskModel.findOne({ where: { id } });

    return new ResponseDto<Task>({
      statusCode: 200,
      message: 'Task found',
      data: task,
    });
  }

  async create(CreateTaskDto: CreateTaskDto): Promise<ResponseDto> {
    const response = await this.taskModel.create({ ...CreateTaskDto });

    return new ResponseDto({
      statusCode: 201,
      message: 'Task created',
      data: response,
    });
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto): Promise<ResponseDto> {
    if (Object.keys(UpdateTaskDto).length === 0) {
      throw new BadRequestException('No fields to update');
    }

    const response = await this.taskModel.update(
      { ...UpdateTaskDto },
      { where: { id } },
    );

    return new ResponseDto({
      statusCode: 200,
      message: 'Task updated',
      data: {
        updated: response,
      },
    });
  }

  async delete(id: number): Promise<ResponseDto> {
    const response = await this.taskModel.destroy({ where: { id } });

    return new ResponseDto({
      statusCode: 200,
      message: `Task with id ${id} successfully deleted`,
      data: {
        deleted: response,
      },
    });
  }
}
