import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueValidator } from '../validators';

export function IsUnique(
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
      validator: IsUniqueValidator,
    });
  };
}
