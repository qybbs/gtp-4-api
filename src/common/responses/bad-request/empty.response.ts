import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const EmptyRequestResponse: ApiResponseNoStatusOptions = {
  description: 'Body request is incomplete',
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
              example: '{fieldName} should not be empty',
            },
          },
          error: {
            type: 'string',
            example: 'Bad Request',
          },
          statusCode: {
            type: 'number',
            example: 400,
          },
        },
      },
      timestamp: {
        type: 'string',
        example: '2025-03-03T06:59:52.746Z',
      },
      path: {
        type: 'string',
        example: '/*',
      },
    },
  },
};
