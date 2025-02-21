import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-user.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
