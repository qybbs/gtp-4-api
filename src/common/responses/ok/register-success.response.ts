import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const RegisterSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Registered Successfully!',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'User registered successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Johndoe' },
          email: { type: 'string', example: 'john.doe@gmail.com' },
          username: { type: 'string', example: 'johndoe' },
          password: {
            type: 'string',
            example:
              '$2b$10$CZSfr8jZJ5tyGZQE/iM0F.XXfYJSoTMSUTrXGm/CT1.XxmFI5Oh3K',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-03T06:52:34.592Z',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-03T06:52:34.592Z',
          },
        },
      },
    },
  },
};
