import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blogs/:blogId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addComment(
    @Param('blogId') blogId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    // UserId from the request object (provided by JwtAuthGuard)
    const userId = req.user.userId;
    return this.commentService.addComment(blogId, userId, createCommentDto);
  }
}
