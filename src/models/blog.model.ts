import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Tag } from './tag.model';

@Table
export class Blog extends Model {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Tag, 'BlogTags', 'blogId', 'tagId')
  tags: Tag[];
}
