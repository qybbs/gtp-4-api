import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CollabAddedResponse,
  CollabRemovedResponse,
  EmptyRequestResponse,
  InvalidTokenResponse,
  ProjectForbiddenResponse,
} from 'src/common/responses';
import { CollaboratorDto } from '../project/dto/collaborator.dto';
import { ProjectGuard } from 'src/common/guards';

@UseGuards(ProjectGuard)
@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Invite project collaborator',
    description: 'Invite a user to collaborate on a project',
  })
  @ApiOkResponse(CollabAddedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  inviteCollaborator(
    @Body() collaboratorDto: CollaboratorDto,
    @Req() req: Request,
  ) {
    return this.collaboratorService.addCollaborator(collaboratorDto, req);
  }

  @Delete()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Remove project collaborator',
    description: 'Remove a user from a project',
  })
  @ApiOkResponse(CollabRemovedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  removeCollaborator(
    @Body() collaboratorDto: CollaboratorDto,
    @Req() req: Request,
  ) {
    return this.collaboratorService.removeCollaborator(collaboratorDto, req);
  }
}
