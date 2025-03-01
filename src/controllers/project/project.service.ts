import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Project } from 'src/common/models';
import { CreateProjectDto } from './dto/create-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectCollaborator } from 'src/common/models/collaborator.model';
import { Request } from 'express';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
    @Inject('COLLABORATOR_REPOSITORY')
    private readonly collaboratorModel: typeof ProjectCollaborator,
  ) {}

  async getAll(req: Request): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const userId = req['user'].id;
      const ownedProjects = await this.projectModel.findAll({
        where: { userId },
        include: [
          {
            model: ProjectCollaborator,
            attributes: ['userId'],
          },
        ],
      });
      const collabProjects = await this.projectModel.findAll({
        include: [
          {
            model: ProjectCollaborator,
            where: { userId: userId },
            attributes: ['userId'],
          },
        ],
      });
      const projects = {
        ownedProjects: ownedProjects,
        collabProjects: collabProjects,
      };
      if (ownedProjects.length === 0 && collabProjects.length === 0) {
        throw new NotFoundException('No projects found');
      }
      return new ResponseDto({ data: projects });
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
      const project = await this.projectModel.findOne({
        where: { id },
        include: [{ model: ProjectCollaborator, attributes: ['userId'] }],
      });
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
}
