import { BaseDto } from './base.dto';

export class ErrorResponseDto extends BaseDto {
  message: string;
  statusCode: number;
  error: string;
  data?: any;
  constructor(data: Partial<ErrorResponseDto>) {
    super(data);
    Object.assign(this, data);
  }
}
