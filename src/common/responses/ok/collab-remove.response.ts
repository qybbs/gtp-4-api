import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const CollabRemovedResponse: ApiResponseNoStatusOptions = {
  description:
    'User with id ${userId} successfully removed from Project with id ${projectId}!',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example:
          'User with id ${userId} successfully removed from Project with id ${projectId}!',
      },
      statusCode: { type: 'number', example: 200 },
    },
  },
};
