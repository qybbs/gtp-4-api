import { Module } from '@nestjs/common';
import { IsExistValidator } from '../validators';
import {
  collaboratorProvider,
  eventProvider,
  projectProvider,
  taskProvider,
  userProvider,
} from '../providers';

@Module({
  imports: [],
  controllers: [],
  providers: [
    IsExistValidator,
    userProvider,
    projectProvider,
    collaboratorProvider,
    taskProvider,
    eventProvider,
  ],
  exports: [IsExistValidator],
})
export class ValidatorModule {}
