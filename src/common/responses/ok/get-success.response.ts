import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const GetSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Get data successfully',
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
      statusCode: { type: 'number', example: 200 },
    },
  },
};
