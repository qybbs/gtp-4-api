import { Event, Project, Task, User } from '../models';

export const userProvider = {
  provide: 'USER_REPOSITORY',
  useValue: User,
};

export const projectProvider = {
  provide: 'PROJECT_REPOSITORY',
  useValue: Project,
};

export const eventProvider = {
  provide: 'EVENT_REPOSITORY',
  useValue: Event,
};
export const taskProvider = {
  provide: 'TASK_REPOSITORY',
  useValue: Task,
};
