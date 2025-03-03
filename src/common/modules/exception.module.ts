import { Logger, Module } from '@nestjs/common';
import { ExceptionFilterProvider } from '../providers';

@Module({
  providers: [ExceptionFilterProvider, Logger],
  exports: [ExceptionFilterProvider],
})
export class ExceptionModule {}
