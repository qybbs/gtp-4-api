import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/models';
import { ResponseDto } from 'src/common/dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userModel: typeof User,
  ) {}

  async getAll() {
    const users = await this.userModel.findAll();
    return new ResponseDto({ data: users });
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
