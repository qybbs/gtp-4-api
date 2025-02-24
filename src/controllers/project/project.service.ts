import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Project } from 'src/common/models';
import { CreateProjectDto } from './dto/create-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectCollaborator } from 'src/common/models/collaborator.model';
import { CollaboratorDto } from './dto/collaborator.dto';
import { Request } from 'express';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
    @Inject('COLLABORATOR_REPOSITORY')
    private readonly collaboratorModel: typeof ProjectCollaborator,
  ) {}

  async getAll(
    req: Request,
  ): Promise<ResponseDto<Project[]> | ErrorResponseDto> {
    try {
      const userId = req['user'].id;
      const projects = await this.projectModel.findAll({
        where: { userId },
      });
      return new ResponseDto<Project[]>({ data: projects });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async findOne(id: number): Promise<ResponseDto<Project> | ErrorResponseDto> {
    try {
      const project = await this.projectModel.findOne({ where: { id } });
      if (!project) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }
      return new ResponseDto<Project>({ data: project });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async create(
    createProjectDto: CreateProjectDto,
    req: Request,
  ): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const userId = req['user'].id;
      const response = await this.projectModel.create({
        ...createProjectDto,
        userId,
      });
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

  async update(
    id: number,
    UpdateProjectDto: UpdateProjectDto,
  ): Promise<ResponseDto | ErrorResponseDto> {
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

  async delete(id: number): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const response = await this.projectModel.destroy({ where: { id } });
      if (response === 0) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }
      return new ResponseDto({
        data: `Project with id ${id} successfully deleted`,
      });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async getCollaborators(
    projectId: number,
  ): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const collaborators = await this.collaboratorModel.findAll({
        where: { projectId },
      });
      return new ResponseDto<ProjectCollaborator[]>({ data: collaborators });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async addCollaborator(
    CollaboratorDto: CollaboratorDto,
  ): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const response = await this.collaboratorModel.create({
        CollaboratorDto,
      });
      return new ResponseDto({
        data: response,
      });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async removeCollaborator(
    CollaboratorDto: CollaboratorDto,
  ): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const response = await this.collaboratorModel.destroy({
        where: { CollaboratorDto },
      });
      if (response === 0) {
        throw new NotFoundException(
          `Collaborator with id ${CollaboratorDto.userId} not found in project with id ${CollaboratorDto.projectId}`,
        );
      }
      return new ResponseDto({
        data: `Collaborator with id ${CollaboratorDto.userId} successfully removed from project with id ${CollaboratorDto.projectId}`,
      });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async getCollaboratingProjects(
    req: Request,
  ): Promise<ResponseDto<Project[]> | ErrorResponseDto> {
    try {
      const userId = req['user'].id;
      const projects = await this.projectModel.findAll({
        include: [
          {
            model: ProjectCollaborator,
            where: { userId: userId },
          },
        ],
      });
      return new ResponseDto<Project[]>({ data: projects });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }
}
