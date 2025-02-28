import { ExceptionFilterConfig } from '../config';

export const exceptionProvider = {
  provide: 'EXCEPTION_FILTER',
  useClass: ExceptionFilterConfig,
};
