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

    const allOwnedEventsEmpty = ownedEvents.every(
      (project) => project.events.length === 0,
    );

    const allCollabEventsEmpty = collabEvents.every(
      (project) => project.events.length === 0,
    );

    if (allOwnedEventsEmpty && allCollabEventsEmpty) {
      throw new NotFoundException('No tasks found');
    }

    const events = {
      ownedEvents: ownedEvents,
      collabEvents: collabEvents,
    };

    return new ResponseDto({
      statusCode: 200,
      message: 'Events found',
      data: events,
    });
  }

  async findOne(id: number): Promise<ResponseDto<Event>> {
    const event = await this.eventModel.findOne({ where: { id } });

    return new ResponseDto<Event>({
      statusCode: 200,
      message: 'Event found',
      data: event,
    });
  }

  async create(CreateEventDto: CreateEventDto): Promise<ResponseDto> {
    const response = await this.eventModel.create({ ...CreateEventDto });

    return new ResponseDto({
      statusCode: 201,
      message: 'Event created',
      data: response,
    });
  }

  async update(
    id: number,
    UpdateEventDto: UpdateEventDto,
  ): Promise<ResponseDto> {
    if (Object.keys(UpdateEventDto).length === 0) {
      throw new BadRequestException('No fields to update');
    }
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
  }

  async delete(id: number): Promise<ResponseDto> {
    const response = await this.eventModel.destroy({ where: { id } });

    return new ResponseDto({
      statusCode: 200,
      message: 'Event deleted',
      data: {
        deleted: response,
      },
    });
  }
}
