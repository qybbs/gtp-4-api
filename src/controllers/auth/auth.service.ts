import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ErrorResponseDto, ResponseDto } from 'src/common/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string } | ErrorResponseDto> {
    const user = await this.userService.findOneByUsername(loginDto.username);
    const isMatch = await bcrypt.compare(loginDto.password, user.data.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.data.id, username: user.data.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<ResponseDto | ErrorResponseDto> {
    const { confpassword, ...user } = registerDto;
    try {
      const response = await this.userService.create({ ...user });
      return new ResponseDto({ data: response });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new ErrorResponseDto({
          message: 'User with this email or username already exists.',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
  }
}
