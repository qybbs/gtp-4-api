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
        include: [
          {
            model: ProjectCollaborator,
          },
        ],
      });
      if (projects.length === 0) {
        throw new NotFoundException('No projects found');
      }
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
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseDto | ErrorResponseDto> {
    if (Object.keys(updateProjectDto).length === 0) {
      return new ErrorResponseDto({
        message: 'No fields to update',
        statusCode: 400,
        error: 'Bad Request',
      });
    }
    const response = await this.projectModel.update(
      { ...updateProjectDto },
      { where: { id } },
    );
    return new ResponseDto({
      data: {
        message: `Project with id ${id} successfully updated`,
        updatedFields: response[0],
        statusCode: 200,
      },
    });
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
    collaboratorDto: CollaboratorDto,
    req: Request,
  ): Promise<ResponseDto | ErrorResponseDto> {
    if (collaboratorDto.userId === req['user'].id) {
      return new ErrorResponseDto({
        message: 'You cannot add yourself as a collaborator',
        statusCode: 400,
        error: 'Bad Request',
      });
    }
    try {
      const response = await this.collaboratorModel.create({
        ...collaboratorDto,
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
    collaboratorDto: CollaboratorDto,
  ): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const response = await this.collaboratorModel.destroy({
        where: { ...collaboratorDto },
      });
      if (response === 0) {
        throw new NotFoundException(
          `Collaborator with id ${collaboratorDto.userId} not found in project with id ${collaboratorDto.projectId}`,
        );
      }
      return new ResponseDto({
        data: `Collaborator with id ${collaboratorDto.userId} successfully removed from project with id ${collaboratorDto.projectId}`,
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
