import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dto';
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

  async getAll(req: Request): Promise<ResponseDto> {
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
    return new ResponseDto({
      statusCode: 200,
      message: 'Projects found',
      data: projects,
    });
  }

  async findOne(id: number): Promise<ResponseDto<Project>> {
    const project = await this.projectModel.findOne({
      where: { id },
      include: [{ model: ProjectCollaborator, attributes: ['userId'] }],
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return new ResponseDto<Project>({
      statusCode: 200,
      message: 'Project found',
      data: project,
    });
  }

  async create(
    createProjectDto: CreateProjectDto,
    req: Request,
  ): Promise<ResponseDto> {
    const userId = req['user'].id;
    const response = await this.projectModel.create({
      ...createProjectDto,
      userId,
    });
    return new ResponseDto({
      statusCode: 201,
      message: 'Project created successfully',
      data: response,
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseDto> {
    if (Object.keys(updateProjectDto).length === 0) {
      throw new BadRequestException('No fields to update');
    }
    const response = await this.projectModel.update(
      { ...updateProjectDto },
      { where: { id } },
    );
    return new ResponseDto({
      statusCode: 200,
      message: `Project with id ${id} successfully updated`,
      data: {
        updated: response,
      },
    });
  }

  async delete(id: number): Promise<ResponseDto> {
    const response = await this.projectModel.destroy({ where: { id } });
    if (response === 0) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return new ResponseDto({
      statusCode: 200,
      message: `Project with id ${id} successfully deleted`,
      data: {
        deleted: response,
      },
    });
  }

  async getCollaborators(
    projectId: number,
  ): Promise<ResponseDto<ProjectCollaborator[]>> {
    const collaborators = await this.collaboratorModel.findAll({
      where: { projectId },
    });
    return new ResponseDto<ProjectCollaborator[]>({
      statusCode: 200,
      message: 'Collaborators found',
      data: collaborators,
    });
  }
}
