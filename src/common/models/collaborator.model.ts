import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';

@Table({
  tableName: 'project_collaborators',
})
export class ProjectCollaborator extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
