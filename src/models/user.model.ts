import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Blog } from './blog.model';
import { Comment } from './comment.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Blog)
  blogs: Blog[];

  @HasMany(() => Comment)
  comments: Comment[];
}
