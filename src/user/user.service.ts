import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAll() {
    return 'Find All User';
  }

  findOne(id: number) {
    return 'Find One User ' + id;
  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return {
      ...updateUserDto,
      id,
    };
  }

  delete(id: number) {
    return 'Delete One User ' + id;
  }
}
