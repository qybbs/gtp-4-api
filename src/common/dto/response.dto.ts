import { BaseDto } from './base.dto';

export class ResponseDto<T = unknown> extends BaseDto {
  data: T;
  message: string;
  statusCode: number;

  constructor(data: Partial<ResponseDto<T>>) {
    super(data);
    this.data = data.data ?? ({} as T);
    this.message = data.message ?? '';
    this.statusCode = data.statusCode ?? 200;
  }
}
