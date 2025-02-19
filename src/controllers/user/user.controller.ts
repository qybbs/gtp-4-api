import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'Get all user' })
  @Get()
  @ApiOkResponse({
    isArray: true,
  })
  findAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Get(':id')
  @ApiOkResponse({
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Post resource user' })
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  @ApiOperation({ summary: 'Update resource user' })
  @Patch(':id')
  @ApiOkResponse({
    description: 'User with id ${id} successfully updated',
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete resource user' })
  @Delete(':id')
  @ApiOkResponse({
    description: 'User with id ${id} successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
