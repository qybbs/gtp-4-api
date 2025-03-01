import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { Unguard } from 'src/common/decorators';
import {
  CreatedResponse,
  DeletedResponse,
  EmptyRequestResponse,
  GetAllSuccessResponse,
  GetSuccessResponse,
  InvalidTokenResponse,
  NotFoundResponse,
  ProjectForbiddenResponse,
  UpdatedResponse,
} from 'src/common/responses';
import { ProjectGuard } from 'src/common/guards';

@UseGuards(ProjectGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Unguard()
  @Get()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get all event',
    description: 'Retrieve all event owned by the logged-in user',
  })
  @ApiOkResponse(GetAllSuccessResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  findAll(@Req() req: Request) {
    return this.eventService.getAllByProject(req);
  }

  @Get(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Get one event',
    description: 'Retrieve an event by ID',
  })
  @ApiOkResponse(GetSuccessResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Post resource event',
    description: 'Create a new event',
  })
  @ApiCreatedResponse(CreatedResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  create(@Body() CreateEventDto: CreateEventDto) {
    return this.eventService.create(CreateEventDto);
  }

  @Patch(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Update resource event',
    description: 'Update an event by event ID',
  })
  @ApiOkResponse(UpdatedResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  update(@Param('id') id: number, @Body() UpdateEventDto: UpdateEventDto) {
    return this.eventService.update(id, UpdateEventDto);
  }

  @Delete(':id')
  @ApiBearerAuth('Access Token')
  @ApiOperation({
    summary: 'Delete resource event',
    description: 'Delete an event by event ID',
  })
  @ApiOkResponse(DeletedResponse)
  @ApiUnauthorizedResponse(InvalidTokenResponse)
  @ApiForbiddenResponse(ProjectForbiddenResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  delete(@Param('id') id: number) {
    return this.eventService.delete(id);
  }
}
