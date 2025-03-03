import { HttpExceptionFilter } from '../filters';

export const ExceptionFilterProvider = {
  provide: 'EXCEPTION_FILTER',
  useClass: HttpExceptionFilter,
};
