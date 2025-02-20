export class ProjectService {
  getAll() {
    return 'This action returns all project';
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  create(CreateProjectDto: any) {
    return `This action adds ${CreateProjectDto} a new project`;
  }

  update(id: number, UpdateProjectDto: any) {
    return `This action updates a #${id} project by ${UpdateProjectDto}`;
  }

  delete(id: number) {
    return `This action removes a #${id} project`;
  }
}
