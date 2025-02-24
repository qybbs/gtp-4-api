import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const WrongLoginResponse: ApiResponseNoStatusOptions = {
  description: 'Wrong Username or Password!',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 401 },
      error: { type: 'string', example: 'Unauthorized' },
    },
  },
};
