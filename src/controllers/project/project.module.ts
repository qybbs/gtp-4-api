import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { projectProvider } from 'src/common/providers';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, projectProvider],
  exports: [ProjectService],
})
export class ProjectModule {}
