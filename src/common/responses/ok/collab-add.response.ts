import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const CollabAddedResponse: ApiResponseNoStatusOptions = {
  description:
    'User with id ${userId} successfully invited on Project with id ${projectId}!',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example:
          'User with id ${userId} successfully invited on Project with id ${projectId}!',
      },
      statusCode: { type: 'number', example: 200 },
    },
  },
};
