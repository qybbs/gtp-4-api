import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const LoginSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Logged in Successfully!',
  schema: {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        example: 'eyJhbGc***********NkmCQeNWUqOg',
      },
    },
  },
};
