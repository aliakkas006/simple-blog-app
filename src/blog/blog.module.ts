import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from '../models/blog.model';
import { Tag } from '../models/tag.model';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [SequelizeModule.forFeature([Blog, Tag])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
