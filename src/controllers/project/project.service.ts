import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Project } from 'src/common/models';
import { CreateProjectDto } from './dto/create-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
  ) {}

  async getAll(): Promise<ResponseDto<Project[]>> {
    const projects = await this.projectModel.findAll();
    return new ResponseDto<Project[]>({ data: projects });
  }

  async findOne(id: number): Promise<ResponseDto<Project>> {
    const project = await this.projectModel.findOne({ where: { id } });
    return new ResponseDto<Project>({ data: project });
  }

  async create(CreateProjectDto: CreateProjectDto) {
    try {
      const response = await this.projectModel.create({ ...CreateProjectDto });
      return new ResponseDto({ data: response });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'Project with this name already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }

  async update(id: number, UpdateProjectDto: UpdateProjectDto) {
    try {
      const response = await this.projectModel.update(
        { ...UpdateProjectDto },
        { where: { id } },
      );
      if (response[0] === 0) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }
      return new ResponseDto({
        data: `Project with id ${id} successfully updated`,
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'Project with this name already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    const response = await this.projectModel.destroy({ where: { id } });
    if (response === 0) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return new ResponseDto({
      data: `Project with id ${id} successfully deleted`,
    });
  }
}
