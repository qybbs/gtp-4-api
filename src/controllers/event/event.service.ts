import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';
import { Event } from 'src/common/models';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY') private readonly eventModel: typeof Event,
  ) {}

  async getAll(): Promise<ResponseDto<Event[]>> {
    const events = await this.eventModel.findAll();
    return new ResponseDto<Event[]>({ data: events });
  }

  async findOne(id: number): Promise<ResponseDto<Event>> {
    const event = await this.eventModel.findOne({ where: { id } });
    return new ResponseDto<Event>({ data: event });
  }

  async create(CreateEventDto: CreateEventDto) {
    try {
      const response = await this.eventModel.create({ ...CreateEventDto });
      return new ResponseDto({ data: response });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'Event with this name already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }

  async update(id: number, UpdateEventDto: UpdateEventDto) {
    try {
      const response = await this.eventModel.update(
        { ...UpdateEventDto },
        { where: { id } },
      );
      if (response[0] === 0) {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      return new ResponseDto({
        data: `Event with id ${id} successfully updated`,
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'Event with this name already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    const response = await this.eventModel.destroy({ where: { id } });
    if (response === 0) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return new ResponseDto({
      data: `Event with id ${id} successfully deleted`,
    });
  }
}
