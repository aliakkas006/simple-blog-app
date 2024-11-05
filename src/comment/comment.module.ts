import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from '../models/comment.model';
import { Blog } from '../models/blog.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Blog])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
