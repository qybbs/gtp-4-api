import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Task } from './task.model';
import { Event } from './event.model';
import { User } from './user.model';

@Table({
  tableName: 'projects',
})
export class Project extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => Event)
  events: Event[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
