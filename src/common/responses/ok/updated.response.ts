import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const UpdatedResponse: ApiResponseNoStatusOptions = {
  description: 'Project/Task/Event with id ${id} successfully updated',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Project/Task/Event with id ${id} successfully updated',
      },
      statusCode: { type: 'number', example: 201 },
    },
  },
};
