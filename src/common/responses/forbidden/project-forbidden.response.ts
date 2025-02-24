import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const ProjectForbiddenResponse: ApiResponseNoStatusOptions = {
  description: 'Access to this project is forbidden',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Access to this project is forbidden',
      },
      error: { type: 'string', example: 'Forbidden' },
      statusCode: { type: 'number', example: 403 },
    },
  },
};
