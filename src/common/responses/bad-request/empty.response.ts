import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const EmptyRequestResponse: ApiResponseNoStatusOptions = {
  description: 'Body request is incomplete',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: {
          type: 'string',
          example: 'password should not be empty',
        },
      },
      error: {
        type: 'string',
        example: 'Bad Request',
      },
      statusCode: {
        type: 'integer',
        example: 400,
      },
    },
  },
};
