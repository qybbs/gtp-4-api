import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const GetAllSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Get all data successfully',
  isArray: true,
  schema: {
    type: 'array',
    items: {
      type: 'object',
      example: {
        id: 1,
        'other field': 'other field value...',
        updatedAt: '2025-02-23T14:20:55.853Z',
        createdAt: '2025-02-23T14:20:55.853Z',
      },
    },
    example: [
      {
        id: 1,
        'other field': 'other field value...',
        updatedAt: '2025-02-23T14:20:55.853Z',
        createdAt: '2025-02-23T14:20:55.853Z',
      },
      {
        id: 2,
        'other field': 'other field value...',
        updatedAt: '2025-02-23T14:20:55.853Z',
        createdAt: '2025-02-23T14:20:55.853Z',
      },
    ],
  },
};
