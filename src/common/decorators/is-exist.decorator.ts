import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsExistValidator } from '../validators';

export function IsExist(
  model: string,
  column: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, column],
      validator: IsExistValidator,
    });
  };
}
