import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dto';
import { Event, Project, ProjectCollaborator } from 'src/common/models';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY') private readonly eventModel: typeof Event,
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
  ) {}

  async getAllByProject(req: Request): Promise<ResponseDto> {
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
      return new ResponseDto({
        statusCode: 200,
        message: 'Events found',
        data: events,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number): Promise<ResponseDto<Event>> {
    try {
      const event = await this.eventModel.findOne({ where: { id } });
      return new ResponseDto<Event>({
        statusCode: 200,
        message: 'Event found',
        data: event,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(CreateEventDto: CreateEventDto) {
    try {
      const response = await this.eventModel.create({ ...CreateEventDto });
      return new ResponseDto({
        statusCode: 201,
        message: 'Event created',
        data: response,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, UpdateEventDto: UpdateEventDto) {
    if (Object.keys(UpdateEventDto).length === 0) {
      throw new BadRequestException('No fields to update');
    }
    try {
      const response = await this.eventModel.update(
        { ...UpdateEventDto },
        { where: { id } },
      );
      return new ResponseDto({
        statusCode: 200,
        message: 'Event updated',
        data: {
          updated: response,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    try {
      const response = await this.eventModel.destroy({ where: { id } });
      return new ResponseDto({
        statusCode: 200,
        message: 'Event deleted',
        data: {
          deleted: response,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
