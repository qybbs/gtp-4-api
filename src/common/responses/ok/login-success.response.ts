import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const LoginSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Logged in Successfully!',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Login successful' },
      data: {
        type: 'object',
        properties: {
          access_token: { type: 'string', example: 'eyJhbGci*****WPxBUXU' },
        },
      },
    },
  },
};
