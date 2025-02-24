import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const DeletedResponse: ApiResponseNoStatusOptions = {
  description: 'Project/Task/Event with id ${id} successfully deleted!',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Project/Task/Event with id ${id} successfully deleted!',
      },
      statusCode: { type: 'number', example: 201 },
    },
  },
};
