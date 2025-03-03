import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/models';
import { ResponseDto } from 'src/common/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userModel: typeof User,
  ) {}

  async getAll(): Promise<ResponseDto<User[]>> {
    const users = await this.userModel.findAll();
    return new ResponseDto<User[]>({ data: users });
  }

  async findOne(id: number): Promise<ResponseDto<User>> {
    const user = await this.userModel.findOne({ where: { id } });
    return new ResponseDto<User>({ data: user });
  }

  async findOneByUsername(username: string): Promise<ResponseDto<User>> {
    const user = await this.userModel.findOne({ where: { username } });
    return new ResponseDto<User>({ data: user });
  }

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, await salt);
    createUserDto.password = hash;
    try {
      const response = await this.userModel.create({ ...createUserDto });
      return new ResponseDto({ data: response });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.userModel.update(
        { ...updateUserDto },
        { where: { id } },
      );
      if (response[0] === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return new ResponseDto({
        data: `User with id ${id} successfully updated`,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      const response = await this.userModel.destroy({ where: { id } });
      if (response === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return new ResponseDto({
        data: `User with id ${id} successfully deleted`,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
