import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const GetAllNotFoundResponse: ApiResponseNoStatusOptions = {
  description: 'Resource not found',
  schema: {
    example: {
      message: 'No projects/tasks/events found',
      error: 'Not Found',
      statusCode: 404,
    },
  },
};
