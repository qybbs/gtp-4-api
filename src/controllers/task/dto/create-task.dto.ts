import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
