import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from './user.model';
import { Blog } from './blog.model';

@Table
export class Comment extends Model {
  @Column
  content: string;

  @ForeignKey(() => Blog)
  @Column
  blogId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsTo(() => Blog)
  blog: Blog;
}
