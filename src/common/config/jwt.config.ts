import { JwtModuleOptions } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' },
};
