import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Event, ProjectCollaborator } from 'src/common/models';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY') private readonly eventModel: typeof Event,
    @Inject('PROJECT_REPOSITORY') private readonly projectModel,
  ) {}

  async getAllByProject(req: Request): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const userId = req['user'].id;
      const ownedEvents = await this.projectModel.findAll({
        where: { userId },
        attributes: ['id', 'name'],
        include: [
          {
            model: Event,
          },
        ],
      });
      const collabEvents = await this.projectModel.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: ProjectCollaborator,
            where: { userId: userId },
            attributes: [],
          },
          {
            model: Event,
          },
        ],
      });
      const events = {
        ownedEvents: ownedEvents,
        collabEvents: collabEvents,
      };
      if (ownedEvents.length === 0 && collabEvents.length === 0) {
        throw new NotFoundException('No tasks found');
      }
      return new ResponseDto({ data: events });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async findOne(id: number): Promise<ResponseDto<Event> | ErrorResponseDto> {
    try {
      const event = await this.eventModel.findOne({ where: { id } });
      return new ResponseDto<Event>({ data: event });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: error.status || 500,
        error: error.name || 'Internal Server Error',
      });
    }
  }

  async create(CreateEventDto: CreateEventDto) {
    try {
      const response = await this.eventModel.create({ ...CreateEventDto });
      return new ResponseDto({ data: response });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: 400,
        error: error.name || 'Bad Request',
      });
    }
  }

  async update(id: number, UpdateEventDto: UpdateEventDto) {
    if (Object.keys(UpdateEventDto).length === 0) {
      return new ErrorResponseDto({
        message: 'No fields to update',
        statusCode: 400,
        error: 'Bad Request',
      });
    }
    try {
      const response = await this.eventModel.update(
        { ...UpdateEventDto },
        { where: { id } },
      );
      return new ResponseDto({
        data: {
          message: `Event with id ${id} successfully updated`,
          updated: response[0],
        },
      });
    } catch (error) {
      return new ErrorResponseDto({
        message: error.message,
        statusCode: 400,
        error: error.name || 'Bad Request',
      });
    }
  }

  async delete(id: number): Promise<ResponseDto | ErrorResponseDto> {
    try {
      const response = await this.eventModel.destroy({ where: { id } });
      return new ResponseDto({
        data: {
          message: `Event with id ${id} successfully deleted`,
          deleted: response[0],
        },
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
