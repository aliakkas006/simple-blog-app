import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Blog } from './blog.model';

@Table
export class Tag extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Blog, 'BlogTags', 'tagId', 'blogId')
  blogs: Blog[];
}
