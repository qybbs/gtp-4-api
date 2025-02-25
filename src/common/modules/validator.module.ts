import { Module } from '@nestjs/common';
import { IsExistValidator, IsUniqueValidator } from '../validators';
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
    IsUniqueValidator,
    userProvider,
    projectProvider,
    collaboratorProvider,
    taskProvider,
    eventProvider,
  ],
  exports: [IsExistValidator, IsUniqueValidator],
})
export class ValidatorModule {}
