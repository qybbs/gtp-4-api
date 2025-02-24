import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const InvalidTokenResponse: ApiResponseNoStatusOptions = {
  description: 'Access token not provided or invalid access token',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Access token not provided/invalid access token',
      },
      statusCode: { type: 'number', example: 401 },
      error: { type: 'string', example: 'Unauthorized' },
    },
  },
};
