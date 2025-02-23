import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { collaboratorProvider, projectProvider } from 'src/common/providers';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, projectProvider, collaboratorProvider],
  exports: [ProjectService],
})
export class ProjectModule {}
