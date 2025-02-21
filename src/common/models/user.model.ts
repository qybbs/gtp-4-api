import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Project } from './project.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @HasMany(() => Project)
  projects: Project[];
}
