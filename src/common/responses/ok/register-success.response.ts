import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const RegisterSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Registered Successfully!',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john.doe@gmail.com' },
      username: { type: 'string', example: 'johndoe' },
      password: {
        type: 'string',
        example: '$2b$10$AhZgulhCK1hSuZha50obAutoY11EZmrpU5JNtr/A2ZPQyqQktw8IK',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-02-23T13:12:23.776Z',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-02-23T13:12:23.776Z',
      },
    },
  },
};
