import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectCollaborator } from 'src/common/models';
import { CollaboratorDto } from '../project/dto/collaborator.dto';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';

@Injectable()
export class CollaboratorService {
  constructor(
    @Inject('COLLABORATOR_REPOSITORY')
    private readonly collaboratorModel: typeof ProjectCollaborator,
  ) {}

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
      const isExist = await this.collaboratorModel.findOne({
        where: { ...collaboratorDto },
      });
      if (isExist) {
        return new ErrorResponseDto({
          message: 'User is already a collaborator in this project',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
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
    req: Request,
  ): Promise<ResponseDto | ErrorResponseDto> {
    try {
      if (collaboratorDto.userId == req['user'].id) {
        return new ErrorResponseDto({
          message: 'You cannot remove yourself',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
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
}
