import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(loginDto.username);
    const isMatch = await bcrypt.compare(loginDto.password, user.data.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.data.id, username: user.data.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
