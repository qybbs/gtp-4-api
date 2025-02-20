export class EventService {
  getAll() {
    return 'This action returns all event';
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  create(CreateEventDto: any) {
    return `This action adds ${CreateEventDto} a new event`;
  }

  update(id: number, UpdateEventDto: any) {
    return `This action updates a #${id} event by ${UpdateEventDto}`;
  }

  delete(id: number) {
    return `This action removes a #${id} event`;
  }
}
