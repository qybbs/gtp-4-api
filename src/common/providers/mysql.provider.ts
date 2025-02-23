import { Sequelize } from 'sequelize-typescript';
import { mysqlConfig } from '../config/mysql.config';
import { Event, Project, Task, User } from '../models';
import { ProjectCollaborator } from '../models/collaborator.model';

export const mysqlProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize(mysqlConfig);
    sequelize.addModels([User, Project, Task, Event, ProjectCollaborator]);
    await sequelize.sync();
    return sequelize;
  },
};
