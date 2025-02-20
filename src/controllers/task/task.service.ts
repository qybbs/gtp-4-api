export class TaskService {
  getAll() {
    return 'This action returns all task';
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  create(CreateTaskDto: any) {
    return `This action adds ${CreateTaskDto} a new task`;
  }

  update(id: number, UpdateTaskDto: any) {
    return `This action updates a #${id} task by ${UpdateTaskDto}`;
  }

  delete(id: number) {
    return `This action removes a #${id} task`;
  }
}
