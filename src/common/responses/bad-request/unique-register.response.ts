import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const UniqueRegisterResponse: ApiResponseNoStatusOptions = {
  description: 'Email or username already taken',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'User with this email or username already exists.',
      },
      statusCode: { type: 'number', example: 400 },
      error: { type: 'string', example: 'Bad Request' },
    },
  },
};
