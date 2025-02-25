import { Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Event, Project, Task, User } from '../models';
import { ProjectCollaborator } from '../models/collaborator.model';

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userModel: typeof User,
    @Inject('PROJECT_REPOSITORY') private readonly projectModel: typeof Project,
    @Inject('COLLABORATOR_REPOSITORY')
    private readonly collaboratorModel: typeof ProjectCollaborator,
    @Inject('TASK_REPOSITORY') private readonly taskModel: typeof Task,
    @Inject('EVENT_REPOSITORY') private readonly eventModel: typeof Event,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const [modelName, columnName] = args.constraints;
    let result;
    if (modelName === 'User') {
      result = await this.userModel.findOne({ where: { [columnName]: value } });
    } else if (modelName === 'Project') {
      result = await this.projectModel.findOne({
        where: { [columnName]: value },
      });
    } else if (modelName === 'ProjectCollaborator') {
      result = await this.collaboratorModel.findOne({
        where: { [columnName]: value },
      });
    } else if (modelName === 'Task') {
      result = await this.taskModel.findOne({
        where: { [columnName]: value },
      });
    } else if (modelName === 'Event') {
      result = await this.eventModel.findOne({
        where: { [columnName]: value },
      });
    }
    return !!result;
  }

  defaultMessage(args: ValidationArguments) {
    const [modelName, columnName] = args.constraints;
    return `${columnName} does not exist in ${modelName} data`;
  }
}
