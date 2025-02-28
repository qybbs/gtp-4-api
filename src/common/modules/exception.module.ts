import { Module } from '@nestjs/common';
import { exceptionProvider } from '../providers';

@Module({
  providers: [exceptionProvider],
})
export class ExceptionModule {}
