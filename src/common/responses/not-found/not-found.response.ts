import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const NotFoundResponse: ApiResponseNoStatusOptions = {
  description: 'Resource not found',
  schema: {
    example: {
      message: 'Project/Task/Event with id ${id} not found',
      error: 'Not Found',
      statusCode: 404,
    },
  },
};
