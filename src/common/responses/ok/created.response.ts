import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const CreatedResponse: ApiResponseNoStatusOptions = {
  description: 'Created/Added successfully',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        example: {
          id: 1,
          'other field': 'other field value...',
          updatedAt: '2025-02-23T14:20:55.853Z',
          createdAt: '2025-02-23T14:20:55.853Z',
        },
      },
      message: {
        type: 'string',
        example: 'Created/Added successfully',
      },
      statusCode: { type: 'number', example: 201 },
    },
  },
};
