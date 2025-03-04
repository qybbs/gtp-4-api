import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectCollaborator } from 'src/common/models';
import { CollaboratorDto } from './dto/collaborator.dto';
import { ResponseDto } from 'src/common/dto';

@Injectable()
export class CollaboratorService {
  constructor(
    @Inject('COLLABORATOR_REPOSITORY')
    private readonly collaboratorModel: typeof ProjectCollaborator,
  ) {}

  async addCollaborator(
    collaboratorDto: CollaboratorDto,
    req: Request,
  ): Promise<ResponseDto> {
    if (collaboratorDto.userId === req['user'].id) {
      throw new BadRequestException(
        'You cannot add yourself as a collaborator',
      );
    }

    const isExist = await this.collaboratorModel.findOne({
      where: { ...collaboratorDto },
    });

    if (isExist) {
      throw new BadRequestException(
        'User is already a collaborator in this project',
      );
    }

    const response = await this.collaboratorModel.create({
      ...collaboratorDto,
    });

    return new ResponseDto({
      statusCode: 201,
      message: 'Collaborator added successfully',
      data: {
        userId: response.userId,
        projectId: response.projectId,
      },
    });
  }

  async removeCollaborator(
    collaboratorDto: CollaboratorDto,
    req: Request,
  ): Promise<ResponseDto> {
    if (collaboratorDto.userId == req['user'].id) {
      throw new BadRequestException(
        'You cannot remove yourself as a collaborator',
      );
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
      statusCode: 200,
      message: 'Collaborator removed successfully',
      data: {
        userId: collaboratorDto.userId,
        projectId: collaboratorDto.projectId,
      },
    });
  }
}
