import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Project } from './project.model';

@Table({
  tableName: 'events',
})
export class Event extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  date: Date;

  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;
}
