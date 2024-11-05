import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from '../models/comment.model';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Blog } from '../models/blog.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentModel: typeof Comment,
    @InjectModel(Blog) private blogModel: typeof Blog,
  ) {}

  async addComment(
    blogId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    // Find the blog to ensure it exists
    const blog = await this.blogModel.findByPk(blogId);
    if (!blog) {
      throw new Error('Blog not found');
    }

    // Create and return the comment
    const comment = await this.commentModel.create({
      content: createCommentDto.content,
      blogId,
      userId,
    });

    return comment;
  }
}
