import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsMatchValidator } from '../validators/is-match.validator';

export function IsMatch(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsMatchValidator,
    });
  };
}
