import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const BadReqRegisterResponse: ApiResponseNoStatusOptions = {
  description: 'Email or username already taken',
  schema: {
    type: 'object',
    properties: {
      response: {
        type: 'object',
        properties: {
          message: {
            type: 'array',
            items: {
              type: 'string',
              example: [
                'email must be an email',
                'email/username already exist in User data',
                'name/email/username/password/confpassword should not be empty',
                'confpassword must be same to password',
              ],
            },
          },
          error: { type: 'string', example: 'Bad Request' },
          statusCode: { type: 'number', example: 400 },
        },
      },
      timestamp: { type: 'string', example: '2025-03-03T06:36:27.071Z' },
      path: { type: 'string', example: '/auth/register' },
    },
  },
};
